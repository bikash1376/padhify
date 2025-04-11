const { Router } = require('express');
const { userModel, purchaseModel, courseModel } = require('../db');
const jwt = require("jsonwebtoken");
const z = require('zod');
const bcrypt = require('bcrypt')
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD || "your-secret-key";

const userRouter = Router();


const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

userRouter.post("/signup", async (req, res) => {
    try {
        // Validate request body
        const parsedData = signupSchema.parse(req.body);

        // Hash the password
        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        // Replace plain password with hashed one
        const userToCreate = {
            ...parsedData,
            password: hashedPassword
        };

        // Save to DB
        await userModel.create(userToCreate);

        res.status(201).json({
            message: "Signup succeeded"
        });
    } catch (err) {
        // Handle Zod validation or general errors
        if (err.errors) {
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        // 2. Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        // 3. Create JWT
        const token = jwt.sign(
            { id: user._id },
            JWT_USER_PASSWORD,
            { expiresIn: "1h" } // optional: set token expiration
        );

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


userRouter.get('/purchases', async (req, res) => {

    const userId = req.userId

    const purchases = await purchaseModel.find({
        userId,
    })

    let purchasedCourseIds = [];

    for(let i =0; i<purchases.length;i++) {
        purchasedCourseIds.push(purchases[i].courseId)

    }
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter
}