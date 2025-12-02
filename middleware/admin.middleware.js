/**
 * =======================================
 *           Admin Middleware 
 * =======================================
 */

/**
 * --------------------------------
 *      Configure Middleware
 * --------------------------------
 */
const adminMiddleware = (req, res, next) => {
    try {
        if (req.userInfo.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: `Access denied! Admin rights required.`
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Access denied! Admin rights required.`
        });
    }
};


/**  
 * --------------------------------
 *       Export Middleware
 * --------------------------------
 */
module.exports = adminMiddleware;