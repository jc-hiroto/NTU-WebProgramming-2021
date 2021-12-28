import mongoose, { mongo } from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to mongo');
    dataInit();
  });
}

export default { connect };