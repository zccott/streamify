import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo DB connected : ${conn.connection.host}`)
    } catch (error) {
        console.log('Error connecting to Mongo DB', error)
        process.exit(1)
    }
}