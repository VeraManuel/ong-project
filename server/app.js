const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const documentationFile = require("./documentation/ONGAlkemy-Swagger.json");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const organizationRouter = require("./routes/organization");
const entryRouter = require("./routes/entry");
const handleError = require("./middlewares/errorHandler");
const activityRouter = require("./routes/activities");
const contactsRouter = require("./routes/contacts");
const testimonyRouter = require("./routes/testimony");
const categoryRouter = require("./routes/categories");
const memberRouter = require("./routes/members");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/organizations", organizationRouter);
app.use("/news", entryRouter);
app.use("/activities", activityRouter);
app.use("/contacts", contactsRouter);
app.use("/testimonials", testimonyRouter);
app.use("/categories", categoryRouter);
app.use("/members", memberRouter);

// Swagger route DOC
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(documentationFile));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(handleError);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
