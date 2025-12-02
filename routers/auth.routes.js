/**
 * =======================================
 *              Auth Router
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const express = require('express');
const {
    registerUser,
    loginUser,
    changePassword
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');


/**
 * --------------------------------
 *        Configure Router
 * --------------------------------
 */
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/change-password', authMiddleware, changePassword);

/**  
 * --------------------------------
 *         Export Router
 * --------------------------------
 */
module.exports = authRouter;




