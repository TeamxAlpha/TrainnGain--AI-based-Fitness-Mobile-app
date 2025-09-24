const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, required: true },

  // 👇 Workouts array
  workouts: [
    {
      date: { type: Date, default: Date.now },
      caloriesBurned: { type: Number, default: 0 },
      duration: { type: Number, default: 0 }, // in minutes
    },
  ],

  // 👇 Goals array
  goals: [
    {
      goal: { type: String, required: true },
      isAchieved: { type: Boolean, default: false },
    },
  ],
}, {
  collection: "UserInfo",
});

const usersauth = mongoose.model("UserInfo", newSchema);

module.exports = usersauth;
    