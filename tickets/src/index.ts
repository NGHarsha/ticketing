import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log("Inside start");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Key is not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI Key is not defined");
  }

  try {
    await natsWrapper.connect("ticketing", "123", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS terminated gracefully");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connection success");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000");
  });
};

start();
