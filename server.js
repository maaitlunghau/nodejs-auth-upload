/**
 * =======================================
 *         Application - Server
 * =======================================
 */

/**
 * --------------------------------
 *     Import Module & Library
 * --------------------------------
 */
require('dotenv').config();

const express = require('express');
const connectDB = require('./database/db');
const { jsonParser, urlencodedParser } = require('./middleware/parser');

const authRouter = require('./routers/auth.routes');
const homeRouter = require('./routers/home.routes');
const adminRouter = require('./routers/admin.routes');
const imageRouter = require('./routers/image.routes');


/**
 * --------------------------------
 *        Configure Server
 * --------------------------------
 */
const app = express();

app.use(jsonParser);
app.use(urlencodedParser);

connectDB(); // connect MongoDB database

/**
 * --------------------------------
 *             Router
 * --------------------------------
 */
app.get('/', (req, res) => {
    res.send('Welcome to my website');
});

app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/images', imageRouter);


/**
 * --------------------------------
 *           Run Server
 * --------------------------------
 */
const PORT = process.env.PORT || 4000;
const URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`✅ Server is now running on ${URL}`);
});