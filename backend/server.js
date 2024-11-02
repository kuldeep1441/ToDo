const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);



// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/tasks", taskRoutes);

// rough
app.get("/", (req, res) => {
  res.json("Hello");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// "https://to-do-app-seven-delta-70.vercel.app";