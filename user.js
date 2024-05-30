const express = require("express");
//const cors = require("cors");
const usersauth = require("./api/modules/mongo"); 
const bcrypt = require("bcrypt")
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(cors({
    origin: 'exp://127.0.0.1:8081',
    credentials: true
}));*/

app.use(session({
    secret: 'shhh',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: false,
    }
}));

app.post("/", async (req, res) => {
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
                user: {
                    ...user.toObject(),
                    cart: user.cart.map(product => product._id),
                    wishlist: user.wishlist.map(product => product._id),
                }
            });
        } else {
            return res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});



app.post("/signup", async (req, res) => {
    const { name, email, password, age, weight, gender } = req.body;

    const data = {
        name,
        email,
        password,
        age,
        weight,
        gender,
    };

    try {
        const check = await usersauth.findOne({ email: email });

        if (check) {
            return res.json("exist");
        } else {
            const EncPassword = await bcrypt.hash(password, 10);
            const user = await usersauth.create({
                name,
                email,
                password: EncPassword,
                age,
                weight,
                gender
            });
            req.session.userId = user._id;

            res.status(201).json(user);
            return;
        }
    } catch (error) {
        console.error(error, "Backend");
        res.json("fail");
        return;
    }
});

app.listen(8000, () => {
    console.log("Server is running in localhost 3k")
})