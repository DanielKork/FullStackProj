//Daniel Korkus 314629692
//Tamir Razon 207421322


const prod = require('../models/caloriesModel')
const users = require('../models/userModel');
const customException = require('../customException');


exports.addcalories = async (req, res) => {
    try {
        // Check if the addCalories request is invalid
        if (req.body.user_id === undefined || req.body.description === undefined ||
            req.body.category === undefined || req.body.amount === undefined) {
            throw new customException.NotEnoughParametersException("Request failed, the request is missing one or more parameters.");
        }

        // Check if the category is invalid
        if (req.body.category !== "breakfast" && req.body.category !== "lunch" &&
            req.body.category !== "dinner" && req.body.category !== "other" && req.body.category !== undefined) {
            throw new customException.WrongCategoryException("Request failed, the category must be one of the following: breakfast, lunch, dinner, other");
        }

        // Check if the date is invalid
        if (req.body.day < 1 || req.body.day > 31 || req.body.month < 1 || req.body.month > 12 || req.body.year < 1900) {
            throw new customException.OutOfRangeDateException("Request failed, the date must be valid.");
        }

        // Check if the requested user exists in the database
        const user = await users.find({ "id": req.body.user_id });
        if (user.length === 0) { // If user.length === 0 then the user doesn't exist, if user.length === 1 then the user exists
            throw new customException.UserNotFoundException("Request failed, no user with the provided ID was found.");
        }

        // Creating a new instance of the prod model with request body data
        const calories = new prod(req.body);

        // If day/month/year is missing, we add the current date
        if (calories.day === undefined || calories.month === undefined || calories.year === undefined) {
            const date = new Date();
            calories.day = date.getDate();
            calories.month = date.getMonth() + 1; // We are adding 1 because the first month is 0
            calories.year = date.getFullYear();
        }

        // Saving the new calorie data to the database
        const savedProd = await calories.save();

        // Sending a success response with the saved product details
        res.status(200).json({
            message: 'Success',
            savedProd,
        });
    } catch (error) {
        // Handling errors and sending an appropriate error response
        console.log(error);
        res.status(400).json({
            error: 'Unable to add product',
            message: error.message
        });
    }
};




