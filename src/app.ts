import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import lusca from "lusca";
import path from "path";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import flash from "express-flash";
import expressValidator from "express-validator";
import passport from "passport";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// API keys and Passport configuration
require("./config/passport");

// Create Express server
const app = express();

const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});


// Express configuration
app.set("listen_port", process.env.LISTEN_PORT || 3000);
app.set("listen_address", process.env.LISTEN_ADDRESS || "::");  // Default IPv6

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(session({ cookie: { maxAge: 60000 },
                  secret: "wootabc",
                  resave: false,
                  saveUninitialized: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

// app.use(
//   express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );
app.use(express.static(path.join(__dirname, "assets")));
/**
 * Primary app routes.
 */
const appRoutes = require("./routes/app");
app.use("/", appRoutes);

export default app;