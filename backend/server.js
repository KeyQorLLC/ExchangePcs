const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

// middleware
// cors跨域, could accept request from different IP prefix
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// routes
// req = {url: localhost:5000/api/user, method: GET, param: [] ... }
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/card", require("./routes/cardRoutes"));

// connect to port
app.listen(port, () => console.log(`Server started on port ${port}`));
