const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://trainngain:tng@cluster0.yca3ker.mongodb.net/")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("Failed to connect DB:", err);
    });

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        required: true
    }
})

const usersauth = mongoose.model("TNGusers", newSchema)

module.exports = usersauth;