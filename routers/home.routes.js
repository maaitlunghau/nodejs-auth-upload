/**
 * =======================================
 *              Home Router
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');


/**
 * --------------------------------
 *        Configure Router
 * --------------------------------
 */
const homeRouter = express.Router();

homeRouter.get('/welcome', authMiddleware, (req, res) => {
    const { userId, username, role } = req.userInfo;

    res.json({
        message: `Welcome to the home page`,
        user: {
            _id: userId,
            username,
            role
        }
    });
});


/**  
 * --------------------------------
 *         Export Router
 * --------------------------------
 */
module.exports = homeRouter;




