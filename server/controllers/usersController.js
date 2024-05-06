//Daniel Korkus 314629692
//Tamir Razon 207421322


const prod = require('../models/caloriesModel')
const users = require('../models/userModel');
const customException = require('../customException');


// exports.LogIn = async (req, res) => {
//     try {
//         // Check if the requested user exists in the database
//         const user = await users.find({ "id": req.body.user_id });
//         if (user.length === 0) { // If user.length === 0 then the user doesn't exist, if user.length === 1 then the user exists
//             throw new customException.UserNotFoundException("Request failed, no user with the provided ID was found.");
//         }

//         // Saving the new calorie data to the database
//         //const savedProd = await calories.save();

//         // Sending a success response with the saved product details
//         res.status(200).json({
//             message: 'logged in Successfully',
//             //savedProd,
//         });
//     } catch (error) {
//         // Handling errors and sending an appropriate error response
//         console.log(error);
//         res.status(400).json({
//             error: 'Unable to log in',
//             message: error.message
//         });
//     }
// };

exports.LogIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await users.find({ username });

    //&& await bcrypt.compare(password, user.password)
    if (user) {
        //req.session.userId = user._id;  // Set user session
        res.send('Logged in');
    } else {
        res.status(400).send('Invalid credentials');
    }
};
    


