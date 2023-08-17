const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/card", require("./routes/cardRoutes"));

// middleware
app.use(errorHandler);

// connect to port
app.listen(port, () => console.log(`Server started on port ${port}`));
