const cors = require('cors');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./db');

//connect mongodb
connectDB();
//create new server 
const app = express();
//express parse to json files 
app.use(express.json());
//request.body
app.use(express.urlencoded({ extended: false }));
//users routes
app.use('/api/users', require('./routes/userRoutes'));
//phone routes 
app.use('/api/phones', require('./routes/phoneRoutes'));
app.use(errorHandler);

// get the server to start listening
app.listen(process.env.PORT, err => {
    // error checking
    err ? console.error(err) : console.log(`listening on port ${process.env.PORT}`)
})


