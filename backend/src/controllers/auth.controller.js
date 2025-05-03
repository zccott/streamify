import User from "../models/User.js";
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const { email, password, fullName } = req.body

    try {

        if (!email || !password || !fullName) {
            return res.status(400).json({ messege: "All feelds are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ messege: "Password Must be more then 6 Characters" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ messege: "Email already exist, Please use a different one" })
        }

        const idx = Math.floor(Math.random() * 100) + 1 // generate random number between 1 and 100
        const randomAvathar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvathar,
        })

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ sucess: true, user: newUser })
    } catch (error) {
        console.log("Error in SignUp Controller", error)
        res.status(500).json({messege: "Internal Server Error"})
    }
}

export function logout(req, res) {
    res.send("logout")
}

export async function login(req, res) {
    res.send("login")
}