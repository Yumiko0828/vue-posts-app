import e from "express";
import morgan from "morgan";
import "./db.js";
import auth from "./routes/auth.routes.js";
import posts from "./routes/posts.routes.js";
import cors from "cors";
import users from "./routes/users.routes.js";

// Initializations
const app = e();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/auth", auth);
app.use("/posts", posts);
app.use("/users", users);

export default app;
