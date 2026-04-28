const https = require('https');
const User = require('../models/User');

// Verify Firebase ID token using Firebase's public keys
// Uses Firebase's token verification REST endpoint
async function verifyFirebaseToken(idToken) {
    return new Promise((resolve, reject) => {
        const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'uplift-1f94a';
        const options = {
            hostname: 'identitytoolkit.googleapis.com',
            path: `/v1/accounts:lookup?key=${process.env.FIREBASE_WEB_API_KEY || 'AIzaSyC8w2ItFdZGGxrU9SNx0YttpDZOsciTFjA'}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        return reject(new Error(parsed.error.message || 'Token verification failed'));
                    }
                    const user = parsed.users?.[0];
                    if (!user) return reject(new Error('User not found in Firebase'));
                    resolve(user);
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        req.write(JSON.stringify({ idToken }));
        req.end();
    });
}

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Firebase ID tokens are large JWTs; local JWTs are short.
        if (token.length > 500) {
            // Firebase ID token — verify via Firebase REST API
            const firebaseUser = await verifyFirebaseToken(token);
            const user = await User.findOne({ firebaseUid: firebaseUser.localId }).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not synced. Please log in again.' });
            }
            req.user = user;
        } else {
            // Legacy local JWT (backwards-compat)
            const jwt = require('jsonwebtoken');
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(payload.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
        }

        next();
    } catch (error) {
        console.error('❌ AUTH ERROR:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
