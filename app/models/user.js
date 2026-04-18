const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: { 
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: { type: String,
        required: true 
    },

    role: { type: String,
        enum: ['admin', 'user'],
        default: 'user' 
    }
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);