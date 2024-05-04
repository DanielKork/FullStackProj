//Daniel Korkus 314629692
//Tamir Razon 207421322


const express = require('express');
const { LogIn } = require('../controllers/usersController');
// Create a new router instance
const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// Define routes
router.post('/', LogIn);

// Export the router to be used in the main application
module.exports = router;
