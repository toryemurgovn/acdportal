import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("listen_port"), app.get("listen_address"), () => {
  console.log(
    "App is running at http://%s:%d in %s mode",
    app.get("listen_address"),
    app.get("listen_port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
