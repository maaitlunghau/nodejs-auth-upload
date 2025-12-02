/**
 * =======================================
 *              User Model
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const mongoose = require('mongoose');


/**
 * --------------------------------
 *         Schema Design
 * --------------------------------
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, `Username is required`],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, `Email is required`],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });


/**
 * --------------------------------
 *         Create Model
 * --------------------------------
 */
const User = mongoose.model('User', userSchema);


/**  
 * --------------------------------
 *        Export Module
 * --------------------------------
 */
module.exports = User;





