const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({

    email: { type: String, required: true },
    
    exercise: {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        image: {
            type: String,
            require: false
        },
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        }
    }

}, {
    collection: "CustomPlan"
})

const customWorkout = mongoose.model("CustomPlan", workoutSchema)

module.exports = customWorkout;