/**
 * =======================================
 *              Image Model
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
const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


/**
 * --------------------------------
 *         Create Model
 * --------------------------------
 */
const Image = mongoose.model('Image', ImageSchema);


/**  
 * --------------------------------
 *        Export Module
 * --------------------------------
 */
module.exports = Image;





