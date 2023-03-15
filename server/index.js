const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const employerRoute= require("./routes/employer");
const studentRoute= require("./routes/student");
const professionalRoute= require("./routes/professional");
const loginRoute= require("./routes/login");
const registerRoute= require("./routes/register");
const jobRoute= require("./routes/job");
const internshipRoute= require("./routes/internship");
// const jobRoute= require("./routes/hackathon");


//configurations 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({ credentials: true }));

//routes
app.use("/api/student",studentRoute)
app.use("/api/professional",professionalRoute)
app.use("/api/employer",employerRoute)
app.use("/api/login",loginRoute)
app.use("/api/register",registerRoute)
app.use("/api/job",jobRoute)
app.use("/api/internship",internshipRoute)

//server and database
const port = process.env.PORT || 8000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to database" + err);
  });

app.get("/", (req, res) => {
  res.send("hello!");
});

