const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ─── FIREBASE SYNC ─────────────────────────────────────────────────────────
// Called by frontend after Firebase authentication.
// Creates or updates MongoDB user from Firebase profile data.
router.post('/sync', protect, async (req, res) => {
    try {
        const { uid, username, email, avatar } = req.body;

        // The user is already attached by `protect` middleware using firebaseUid
        let user = req.user;

        // Update avatar if provided (e.g. from Google profile)
        if (avatar && !user.avatar) {
            user.avatar = avatar;
            await user.save();
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error('SYNC ERROR:', error);
        res.status(500).json({ message: error.message });
    }
});

// ─── FIREBASE PRE-SYNC (called before protect on first login) ──────────────
// Creates MongoDB user document if not already existing.
// Called with Firebase ID token; verifies it inline to bootstrap the record.
router.post('/sync/init', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const https = require('https');
        const idToken = authHeader.split(' ')[1];
        const FIREBASE_WEB_API_KEY = process.env.FIREBASE_WEB_API_KEY || 'AIzaSyC8w2ItFdZGGxrU9SNx0YttpDZOsciTFjA';

        // Verify token via Firebase Identity Toolkit
        const firebaseUser = await new Promise((resolve, reject) => {
            console.log('SYNC INIT: Verifying token with Identity Toolkit...');
            const body = JSON.stringify({ idToken, returnSecureToken: true });
            console.log('SYNC INIT: Request body length:', body.length);
            const options = {
                hostname: 'identitytoolkit.googleapis.com',
                path: `/v1/accounts:lookup?key=${FIREBASE_WEB_API_KEY}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                },
            };
            const request = https.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => { data += chunk; });
                response.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.error) {
                            console.error('SYNC INIT: Firebase error:', parsed.error);
                            return reject(new Error(parsed.error.message || 'Firebase token invalid'));
                        }
                        const user = parsed.users?.[0];
                        if (!user) {
                            console.error('SYNC INIT: No user in response:', parsed);
                            return reject(new Error('Firebase user not found'));
                        }
                        console.log('SYNC INIT: Token verified successfully for:', user.email);
                        resolve(user);
                    } catch (e) { 
                        console.error('SYNC INIT: JSON parse error:', e);
                        reject(e); 
                    }
                });
            });
            request.on('error', (err) => {
                console.error('SYNC INIT: Request error:', err);
                reject(err);
            });
            request.write(body);
            request.end();
        });

        const { localId: firebaseUid, email, displayName: name, photoUrl: picture } = firebaseUser;
        const { username } = req.body;

        console.log('SYNC INIT: Starting for email:', email);

        // Upsert user by firebaseUid
        let user = await User.findOne({ firebaseUid });

        if (!user) {
            console.log('SYNC INIT: User not found in MongoDB, creating/linking...');
            // Try to find by email (legacy account migration)
            user = await User.findOne({ email });
            if (user) {
                console.log('SYNC INIT: Found user by email, linking firebaseUid');
                // Link existing account to Firebase
                user.firebaseUid = firebaseUid;
                if (!user.avatar && picture) user.avatar = picture;
                await user.save();
            } else {
                // Brand new user
                console.log('SYNC INIT: Creating brand new user');
                let displayName = username || name || email.split('@')[0];
                
                // Ensure username uniqueness (to avoid E11000 duplicate key error)
                const existingUsername = await User.findOne({ username: displayName });
                if (existingUsername) {
                    displayName = `${displayName}_${Math.floor(Math.random() * 1000)}`;
                    console.log('SYNC INIT: Username taken, using:', displayName);
                }

                user = await User.create({
                    firebaseUid,
                    username: displayName,
                    email,
                    avatar: picture || null,
                    password: null,
                });
            }
        } else {
            console.log('SYNC INIT: User found by firebaseUid');
        }

        console.log('SYNC INIT: Success for user:', user._id);

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error('SYNC INIT ERROR:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// ─── LEGACY LOCAL AUTH (kept for backwards compatibility) ──────────────────
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });
        
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── UPDATE PROFILE ────────────────────────────────────────────────────────
router.patch('/profile', protect, async (req, res) => {
    try {
        const { username, avatar } = req.body;
        const user = req.user;

        if (username) user.username = username;
        if (avatar !== undefined) user.avatar = avatar;
        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
