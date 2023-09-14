const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const path = require("path");
var cors = require("cors");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/goals", require("./Routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../glitch404-frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "../",
        "glitch404-frontend",
        "build",
        "index.html"
      )
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`));
