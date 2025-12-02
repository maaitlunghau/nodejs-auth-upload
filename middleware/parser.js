/**
 * =======================================
 *            Parser Middleware 
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
const express = require('express');


/**
 * --------------------------------
 *      Configure Middleware
 * --------------------------------
 */
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });


/**  
 * --------------------------------
 *        Export Module
 * --------------------------------
 */
module.exports = {
    jsonParser,
    urlencodedParser
};