import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
export const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
