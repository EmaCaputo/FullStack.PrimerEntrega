const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);