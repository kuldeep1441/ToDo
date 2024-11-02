// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   date: { type: Date, required: true },
//   startTime: { type: Date, required: true }, // Start time for the task
//   endTime: { type: Date, required: true }, // End time for the task
//   priority: { type: String, enum: ["Low", "Medium", "High"] ,default: "Low"},
//   status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
// });

// module.exports = mongoose.model("Task", taskSchema);



const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  startTime: { type: String, required: true }, // Start time for the task
  endTime: { type: String, required: true }, // End time for the task
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
});

module.exports = mongoose.model("Task", taskSchema);
