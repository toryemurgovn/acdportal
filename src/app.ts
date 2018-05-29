import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import lusca from "lusca";
import path from "path";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

app.use(session({ cookie: { maxAge: 60000 },
                  secret: "woot",
                  resave: false,
                  saveUninitialized: false}));

// Express configuration
app.set("listen_port", process.env.LISTEN_PORT || 3000);
app.set("listen_address", process.env.LISTEN_ADDRESS || "::");  // Default IPv6

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

// app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
/**
 * Primary app routes.
 */
const appRoutes = require("./routes/app");
app.use("/", appRoutes);

export default app;