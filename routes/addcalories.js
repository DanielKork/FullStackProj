//Daniel Korkus 314629692
//Tamir Razon 207421322


const express = require('express');
const { addcalories } = require('../controllers/caloriesController');
// Create a new router instance
const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// Define routes
router.post('/', addcalories);

// Export the router to be used in the main application
module.exports = router;
