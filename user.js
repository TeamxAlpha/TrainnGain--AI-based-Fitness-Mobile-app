const express = require("express");
const usersauth = require("./api/modules/mongo");
const bcrypt = require("bcrypt");
const session = require('express-session');
const app = express();
app.use(express.json());
const mongoose = require("mongoose")
const User = mongoose.model("UserInfo");

app.use(session({
    secret: 'tng',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: false,
    }
}));

const monogUrl = "mongodb+srv://tngapp:tng@cluster0.ipm7ajq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(monogUrl)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("Failed to connect DB:", err);
    });

app.post("/register", async (req, res) => {
    const { name, email, password, age, weight, gender } = req.body;

    const oldUser = await usersauth.findOne({ email: email });
    if (oldUser) {
        return res.send({ data: "User already exists. " });
    }

    try {
        const EncPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email: email,
            password: EncPassword,
            age: age,
            weight: weight,
            gender: gender
        })
        res.send({ status: "ok", data: "User Created" })
    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!password) {
        return res.json({ success: false, message: "Password is required" });
    }
    try {
        const user = await usersauth.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            return res.status(200).json({
                success: true,
                username: user.name,
            });
        } else {
            return res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

app.listen(5001, () => {
    console.log("Node js server started");
});