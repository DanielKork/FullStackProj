//Daniel Korkus 314629692
//Tamir Razon 207421322


// Import required modules
const mongoose = require("mongoose");
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Create Express app
const app = express();

// Configure MongoDB connection
const config = {
  autoIndex: true,
}
mongoose.connect(process.env.DATABASE, config) //github test
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(() => {
    console.log("UNABLE to connect to DB");
  });


// Middleware setup    
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


// Import routers
const caloriesRouter = require('./routes/addcalories');
const reportRouter = require('./routes/report');
const aboutRouter = require('./routes/about');


// Define routes
app.use('/addcalories', caloriesRouter);
app.use('/report', reportRouter);
app.use('/about', aboutRouter);

// Create users table
const users = require('./models/userModel');


// Define port
const port = process.env.PORT || 3000;


// Start the server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
})


// Export the Express app
module.exports = app;
