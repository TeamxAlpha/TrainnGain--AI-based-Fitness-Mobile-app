const mongoose = require("mongoose")


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
},{
    collection: "UserInfo"
})

const usersauth = mongoose.model("UserInfo", newSchema)

module.exports = usersauth;