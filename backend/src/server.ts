import app from "./app";

import env from "./util/validateEnv";

import mongoose from "mongoose";

const port = process.env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DB Connect");

    app.listen(port, () => {
      console.log("server on port " + port);
    });
  })
  .catch(console.error);
