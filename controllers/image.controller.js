/**
 * =======================================
 *            Image Controller
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const Image = require('../models/Image');
const fs = require('fs').promises;
const { uploadToCloudinary, deleteFromCloudinary } = require('../helpers/cloudinary.helper');


/**
 * --------------------------------
 *      Cloudinary Functions
 * --------------------------------
 */
const uploadImage = async (req, res) => {
    try {
        // check if the file is missing in req object
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required! Please upload an image'
            });
        }

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the uploader user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        // delete the file from local storage
        await fs.unlink(req.file.path);

        if (newlyUploadedImage) {
            return res.status(201).json({
                success: true,
                message: '✅ Image uploaded successfully',
                image: newlyUploadedImage
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while uploading image! Please try again'
        });
    }
};

const fetchAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdBy'; // updatedBy?
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if (images) {
            return res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                message: '✅ Gotten all images successfully',
                data: images
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching all image! Please try again'
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found...'
            });
        }

        // check if this image is uploaded by the current user who is trying to delete this image
        if (image.uploadedBy.toString() !== userId) { // !image.uploadedBy.equals(userId) 'in mongodb'
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this image because you haven\'t uploaded it'
            });
        }

        // delete image first from cloudinary storage
        await deleteFromCloudinary(image.publicId);

        // delete image from mongodb database 
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: '✅ Image deleted successfully'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting image! Please try again'
        });
    }
};


/**
 * --------------------------------
 *        Export Functions
 * --------------------------------
 */
module.exports = {
    uploadImage,
    fetchAllImages,
    deleteImage
};