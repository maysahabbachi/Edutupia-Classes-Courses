var createError = require("http-errors");
const express = require("express");
const bodyparser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();
const classesController = require("./routes/classesController");
const seancesController = require("./routes/seancesController");
const classesGroupController = require("./routes/classesGroupController");
const CoursesController = require("./routes/coursesController");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var meetopiaRouter = require("./routes/meetopia");

var app = express();
app.use(bodyparser.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Meetopia", meetopiaRouter);
app.use("/public", express.static("public"));
app.use("/class", classesController);
app.use("/seance", seancesController);
app.use("/classesGroup", classesGroupController);
app.use("/course", CoursesController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
console.log(process.env.mongoURI_MAYSA);
mongoose
  .connect(process.env.mongoURI_MAYSA, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

module.exports = app;
