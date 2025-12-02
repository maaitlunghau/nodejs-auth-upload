/**
 * =======================================
 *              Image Router
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
const uploadMiddleware = require('../middleware/upload.middleware');

const {
    uploadImage,
    fetchAllImages,
    deleteImage
} = require('../controllers/image.controller');


/**
 * --------------------------------
 *        Configure Router
 * --------------------------------
 */
const imageRouter = express.Router();

// upload the image
imageRouter.post('/upload',
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single('image'),
    uploadImage);

// to get all the images
imageRouter.get('/', authMiddleware, fetchAllImages);

// delete image
imageRouter.delete('/:id', authMiddleware, adminMiddleware, deleteImage);


/**  
 * --------------------------------
 *         Export Router
 * --------------------------------
 */
module.exports = imageRouter;




