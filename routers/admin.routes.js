/**
 * =======================================
 *              Admin Router
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');


/**
 * --------------------------------
 *        Configure Router
 * --------------------------------
 */
const adminRouter = express.Router();

adminRouter.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    const { userId, username, role } = req.userInfo;

    res.status(200).json({
        message: `Welcome to the admin page`,
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
module.exports = adminRouter;




