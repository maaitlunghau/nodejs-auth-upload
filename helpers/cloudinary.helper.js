/**
 * =======================================
 *           Cloudinary Helper
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const cloudinary = require('../config/cloudinary');


/**
 * --------------------------------
 *         Helper Function
 * --------------------------------
 */
const uploadToCloudinary = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath);

    return {
        url: result.secure_url,
        publicId: result.public_id
    };
};

const deleteFromCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};


/**
 * --------------------------------
 *         Export Helper
 * --------------------------------
 */
module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};
