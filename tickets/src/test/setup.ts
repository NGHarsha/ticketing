import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "test";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  mongoose.disconnect();
});

//Simulate a cookie and return it.
global.signin = () => {
  //Build a JWT payload.
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build session Object.
  const session = { jwt: token };
  //Turn session to JSON
  const sessionJSON = JSON.stringify(session);
  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a cookie.
  return [`express:sess=${base64}`];
};
