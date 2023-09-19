const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

const multer = require("multer");
const uuid = require("uuid").v4;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${uuid()}.${file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 1000000 } });

// frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

// routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/card", require("./routes/cardRoutes"));
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.body);
  res.json({ status: "success" });
});

// connect to port
app.listen(port, () => console.log(`Server started on port ${port}`));
