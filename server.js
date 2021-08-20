const express       = require('express');
const dotenv        = require('dotenv');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');

// ***** database mongoDB ***** //
const connectDB = require('./server/database/connection');

// ***** express app ***** //
const app = express();

// ***** dotenv ***** //
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// ***** log request status ***** //
app.use(morgan('tiny'));

// ***** mongoDB connection ***** //
connectDB();

// ***** Body Parser Configuration ***** //
app.use(bodyParser.urlencoded({ extended: true }));

// ***** View Configuration ***** //
app.set('view engine', 'ejs');

// ***** Load Asset ***** //
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/vendors', express.static(path.resolve(__dirname, 'assets/vendors')));


// ***** Routes ***** //
const homeRoute = require('./server/routes/homeRoutes');
app.use('/', homeRoute);


// ***** LISTEN APP ***** //
app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT}`);
})