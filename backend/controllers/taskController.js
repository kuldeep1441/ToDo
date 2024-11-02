

// const Task = require("../models/Task");

// // @desc    Create a new task
// // @route   POST /api/tasks
// // @access  Public
// exports.createTask = async (req, res) => {
//   const { title, description, date, startTime, endTime, priority } = req.body;
//   try {
//     if (!title || !date || !startTime || !endTime) {
//       return res
//         .status(400)
//         .json({
//           message: "Title, Date, Start Time, and End Time are required",
//         });
//     }
//     const task = await Task.create({
//       title,
//       description,
//       date,
//       startTime,
//       endTime,
//       priority,
//       status: "In Progress",
//     });

//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @desc    Get all tasks, or search tasks by title/description
// // @route   GET /api/tasks
// // @access  Public
// exports.getTasks = async (req, res) => {
//   const { search } = req.query;

//   try {
//     let tasks;
//     if (search) {
//       tasks = await Task.find({
//         $or: [
//           { title: { $regex: search, $options: "i" } },
//           { description: { $regex: search, $options: "i" } },
//         ],
//       });
//     } else {
//       tasks = await Task.find();
//     }

//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @desc    Update a task's details
// // @route   PUT /api/tasks/:id
// // @access  Public
// exports.updateTask = async (req, res) => {
//   const { title, description, date, startTime, endTime, priority, status } =
//     req.body;

//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.title = title || task.title;
//     task.description = description || task.description;
//     task.date = date || task.date;
//     task.startTime = startTime || task.startTime;
//     task.endTime = endTime || task.endTime;
//     task.priority = priority || task.priority;
//     task.status = status || task.status;

//     const updatedTask = await task.save();
//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @desc    Delete a task
// // @route   DELETE /api/tasks/:id
// // @access  Public
// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     await task.remove();
//     res.json({ message: "Task deleted", taskId: req.params.id });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @desc    Update a task's status
// // @route   PATCH /api/tasks/:id/status
// // @access  Public
// exports.updateStatus = async (req, res) => {
//   const { status } = req.body;

//   try {
//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.status = status;
//     const updatedTask = await task.save();

//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };






const Task = require("../models/Task");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res) => {
  const { title, description, date, startTime, endTime, priority } = req.body;
  try {
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Title, Date, Start Time, and End Time are required",
      });
    }
    const task = await Task.create({
      title,
      description,
      date,
      startTime,
      endTime,
      priority,
      status: "In Progress",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching Tasks" });
  }
};

// @desc    Get all tasks, or search tasks by title/description
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res) => {
  const { search } = req.query;

  try {
    let tasks;
    if (search) {
      tasks = await Task.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      tasks = await Task.find();
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a task's details
// @route   PUT /api/tasks/:id
// @access  Public
exports.updateTask = async (req, res) => {
  const { title, description, date, startTime, endTime, priority, status } =
    req.body;

  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.date = date || task.date;
    task.startTime = startTime || task.startTime;
    task.endTime = endTime || task.endTime;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error updating Tasks" });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
// exports.deleteTask = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const task = await Task.findById(id);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     await task.remove();
//     res.json({ message: "Task deleted", taskId: req.params.id });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove();
    res.json({ message: "Task deleted", taskId: req.params.id });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error Deleting Task" });
  }
};

// @desc    Update a task's status
// @route   PATCH /api/tasks/:id/status
// @access  Public
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error updating status" });
  }
};
