//Daniel Korkus 314629692
//Tamir Razon 207421322


const prod = require('../models/caloriesModel');
const users = require('../models/userModel');
const customException = require('../customException');

exports.getReport = async (req, res) => {
    try {
        // Check if the report request is invalid
        if (req.query.user_id === undefined || req.query.year === undefined || req.query.month === undefined) {
            throw new customException.NotEnoughParametersException("Request failed, the request is missing one or more parameters.");
        }

        // Check if the date is invalid
        if (req.query.year < 1900 || req.query.month < 1 || req.query.month > 12) {
            throw new customException.OutOfRangeDateException("Request failed, the date must be valid.");
        }

        // Check if the requested user exists in the database
        const user = await users.find({ "id": req.query.user_id });
        if (user.length === 0) { // If user.length === 0 then the user doesn't exist, if user.length === 1 then the user exists
            throw new customException.UserNotFoundException("Request failed, no user with the provided ID was found.");
        }

        // Query the database for calorie consumption items
        const items = await prod.find(req.query);

        // Create an object to store the report
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        // Iterate through the calorie consumption items
        items.forEach(item => {
            // Push each item to the corresponding category array in the report
            report[item.category].push({
                day: item.day,
                description: item.description,
                amount: item.amount
            });
        });

        // Send the report as JSON response
        res.json(report);
    } catch (error) {
        console.error('Error getting report:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};
