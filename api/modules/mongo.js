const mongoose= require("mongoose")
mongoose.connect("mongodb+srv://trainngain:asd@cluster0.ht4q82n.mongodb.net/")
.then(() => {
    console.log("BD Connected")
})
.catch(() => {
    console.log("Failed to connect DB")
})

const newSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

const userauth = mongoose.model("User", newSchema);

module.exports=userauth;