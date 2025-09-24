/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const express = require("express");
const mongoose = require("mongoose");
const usersauth = require("./api/modules/mongo");
const CustomPlan = require("./api/modules/customplan");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
app.use(express.json());
const User = mongoose.model("UserInfo");

app.use(
  session({
    secret: "tng",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: false,
    },
  })
);

const monogUrl =
  "mongodb+srv://tngapp:tng@cluster0.ipm7ajq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(monogUrl)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Failed to connect DB:", err));

/* ---------------- REGISTER ---------------- */
app.post("/register", async (req, res) => {
  const { name, email, password, age, weight, gender } = req.body;

  const oldUser = await usersauth.findOne({ email });
  if (oldUser) {
    return res.send({ status: "error", data: "User already exists." });
  }

  try {
    const EncPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: EncPassword,
      age,
      weight,
      gender,
      workouts: [], // ensure arrays exist
      goals: [],
      achievements: [],
    });

    res.send({ status: "ok", data: newUser });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res.json({ success: false, message: "Password is required" });
  }
  try {
    const user = await usersauth.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      return res.status(200).json({
        success: true,
        userId: user._id,
        username: user.name,
        email: user.email,
      });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ---------------- CUSTOM PLANS ---------------- */
app.post("/custom-plans", async (req, res) => {
  const { email, exercise } = req.body;

  if (!email || !exercise?.id || !exercise?.name || !exercise?.image || !exercise?.sets) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newCustomPlan = await CustomPlan.create({
      email,
      exercise,
    });

    res.status(201).json({ success: true, data: newCustomPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/custom-plans/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const customPlans = await CustomPlan.find({ email });
    if (customPlans.length > 0) {
      res.status(200).json({ success: true, data: customPlans });
    } else {
      res.status(404).json({ success: false, message: "Custom plans not found" });
    }
  } catch (error) {
    console.error("Error retrieving custom plans:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/custom-plans/:exerciseId", async (req, res) => {
  const { exerciseId } = req.params;

  try {
    const result = await CustomPlan.findOneAndDelete({ "exercise.id": exerciseId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Exercise not found in custom plan" });
    }

    res.status(200).json({ success: true, message: "Exercise deleted from custom plan" });
  } catch (error) {
    console.error("Error deleting exercise from custom plan:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
});

/* ---------------- USER DATA ---------------- */
app.put("/update-user-data/:userId", async (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/analyze-data/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const workouts = user.workouts || [];
    const averageDuration =
      workouts.length > 0
        ? workouts.reduce((acc, w) => acc + (w.duration || 0), 0) / workouts.length
        : 0;

    res.status(200).json({ success: true, averageDuration });
  } catch (error) {
    console.error("Error analyzing user data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ---------------- GOALS ---------------- */
app.post("/set-goal/:userId", async (req, res) => {
  const { userId } = req.params;
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ success: false, message: "Goal cannot be empty" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { goals: { goal, isAchieved: false } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newGoal = updatedUser.goals[updatedUser.goals.length - 1];
    res.status(200).json({ success: true, data: newGoal });
  } catch (error) {
    console.error("Error setting goal:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/check-goal/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, goals: user.goals || [] });
  } catch (error) {
    console.error("Error checking goals:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/delete-goal/:userId/:goalId", async (req, res) => {
  const { userId, goalId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { goals: { _id: goalId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ---------------- ACHIEVEMENTS ---------------- */
app.post("/add-achievement/:userId", async (req, res) => {
  const { userId } = req.params;
  const { achievement } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { achievements: achievement } },
      { new: true }
    );
    res.status(200).json({ success: true, achievements: user.achievements });
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/get-achievements/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, achievements: user.achievements || [] });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/delete-achievement/:userId/:achievement", async (req, res) => {
  const { userId, achievement } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { achievements: achievement } },
      { new: true }
    );
    res.status(200).json({ success: true, achievements: user.achievements });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ---------------- PERFORMANCE ---------------- */
app.get("/performance-analytics/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const workouts = user.workouts || [];
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const monthlyProgress = workouts
      .filter((w) => w.date && new Date(w.date) >= oneMonthAgo)
      .map((w) => ({
        date: new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: w.caloriesBurned || w.duration || 0,
      }));

    res.status(200).json({ success: true, monthlyProgress });
  } catch (error) {
    console.error("Error getting performance analytics:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(5001, () => console.log("Node js server started"));
