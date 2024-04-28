//Daniel Korkus 314629692
//Tamir Razon 207421322


// Define the schema for the calories collection
const mongoose = require("mongoose")

const caloriesSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true,
        maxLength:32,
        trim: true
    },
    year:{
        type:Number,
        required:true,
        maxLength:32,
        trim: true
    },
    month:{
        type:Number,
        required:true,
        maxLength:32,
        trim: true
    },
    day:{
        type:Number,
        required:true,
        maxLength:32,
        trim: true
    },
    description:{
        type:String,
        required:true,
        maxLength:32,
        trim: true
    },
    category:{
        type:String,
        required:true,
        maxLength:32,
        trim: true
    },
    amount:{
        type:Number,
        required:true,
        maxLength:32,
        trim: true
    }
})

// Export the model based on the schema
module.exports = mongoose.model("calories", caloriesSchema);
