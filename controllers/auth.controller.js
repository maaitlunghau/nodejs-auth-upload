/**
 * =======================================
 *         Auth Controller
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const User = require("../models/User");
const bcrypt = require('bcryptjs'); // to hash password
const jwt = require('jsonwebtoken');


/**
 * --------------------------------
 *         Auth Functions
 * --------------------------------
 */
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // check the existing user
        const checkExistingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: `User is already exists either with same username or same email. Please try with a different username or email.`
            });
        }

        // hash password with bcryptjs
        const salt = await bcrypt.genSalt(10);
        console.log(`Salt key: ${salt}`);

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(`Hashed password: ${hashedPassword}`);

        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: `✅ User registered successfully`,
                user: newlyCreatedUser
            });
        } else {
            res.status(400).json({
                success: false,
                message: `❌ Unable to register with your credential! Please try again.`,
            });
        }

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);

            res.status(400).json({
                success: false,
                message: messages,
            });
        }

        res.status(500).json({
            success: false,
            message: `❌ Something went wrong`,
            error_detail: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check the existing user
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({
                success: false,
                message: `❌ User doesn't exists`
            });
        }

        // check if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: `❌ Invalid credentials!`
            });
        }

        // create user token
        const accessToken = jwt.sign({ // method 'sign' -> sign token -> need 3 params 
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });

        res.status(200).json({
            success: true,
            message: `✅ Logged in successfully`,
            accessToken
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Something went wrong',
            error_detail: err.message
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found...'
            });
        }

        const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: 'Old password is not correct! Please try again...'
            });
        }

        // hashed password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: '✅ Password changed successfully'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while changing password! Please try again...',
            error_detail: err.message
        });
    }
};


/**  
 * --------------------------------
 *        Export Functions
 * --------------------------------
 */
module.exports = {
    registerUser,
    loginUser,
    changePassword
};





