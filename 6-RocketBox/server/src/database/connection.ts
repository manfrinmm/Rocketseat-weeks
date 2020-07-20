import mongoose from "mongoose";

const config = {
  host: process.env.MONGO_HOST || "localhost",
  port: process.env.MONGO_PORT || "27017",
  database: process.env.MONGO_DATABASE || "6-week-rocketBox",
  auth:
    process.env.MONGO_USER && process.env.MONGO_PASS
      ? {
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASS,
        }
      : undefined,
};

const uri = `mongodb://${config.host}:${config.port}/${config.database}`;

mongoose.connect(uri, {
  auth: config.auth,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
