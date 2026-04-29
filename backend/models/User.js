const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // Optional for Firebase users
    firebaseUid: { type: String, default: null, sparse: true }, // Firebase UID
    avatar: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving (only if password is set and modified)
userSchema.pre('save', async function() {
    if (!this.password || !this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method (for legacy local auth)
userSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
