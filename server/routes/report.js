//Daniel Korkus 314629692
//Tamir Razon 207421322


const express = require('express');
const { getReport } = require('../controllers/reportController');
// Create a new router instance
const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// Define a route to handle GET requests to the root URL ('/')
router.get('/', getReport);

// Export the router to be used in the main application
module.exports = router;