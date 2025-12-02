/**
 * =======================================
 *         Connection Database
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
 *      Configure Connection
 * --------------------------------
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`✅ Connected MongoDB database successfully`);

    } catch (err) {
        console.log(`❌ Failed to connect database:`, err.message);
        process.exit(1);
    }
};


/**  
 * --------------------------------
 *        Export Module
 * --------------------------------
 */
module.exports = connectDB;





