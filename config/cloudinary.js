/**
 * =======================================
 *           Cloudinary Config
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
require('dotenv').config();
const cloudinary = require('cloudinary');


/**
 * --------------------------------
 *       Connect Cloudinary
 * --------------------------------
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


/**
 * --------------------------------
 *         Export Module
 * --------------------------------
 */
module.exports = cloudinary;