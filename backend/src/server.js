import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express()
const PORT =process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on this port ${PORT}`)
    connectDB();
})