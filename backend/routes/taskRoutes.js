const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateStatus, // Import the new controller
} = require("../controllers/taskController");

// Route for creating and retrieving tasks
router.route("/").post(createTask).get(getTasks);

// Route for updating and deleting a specific task
router.route("/:id").put(updateTask).delete(deleteTask);

// Route for updating only the status of a task
router.route("/:id").patch(updateStatus);

module.exports = router;
