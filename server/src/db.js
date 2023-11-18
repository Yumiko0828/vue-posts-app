import { connect } from "mongoose";
import { MONGODB_URI } from "./config.js";

connect(MONGODB_URI)
  .then((db) => console.log(`MongoDB Connected to: ${db.connection.name}`))
  .catch((e) => console.error(e));
