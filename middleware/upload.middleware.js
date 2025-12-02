/**
 * =======================================
 *           Upload Middleware 
 * =======================================
 */

/**
 * --------------------------------
 *      Configure Middleware
 * --------------------------------
 */
const multer = require('multer');
const path = require('path');


/**
 * --------------------------------
 *      Configure Middleware
 * --------------------------------
 */
// set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

// file filter 
const checkFileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Not an image! Please upload only images...'));
    }

    cb(null, true);
};


/**  
 * --------------------------------
 *        Export Middleware
 * --------------------------------
 */
module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});