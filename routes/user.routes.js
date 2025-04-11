const { Router } = require('express');
const { userModel, purchaseModel } = require('../db');
const jwt = require("jsonwebtoken");
const z = require('zod');
const bcrypt = require('bcrypt')
const JWT_USER_PASSWORD = require('../config')

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


userRouter.get('/login', (req, res) => {
    const {email, password} = req.body;
    
    const user = userModel.findOne({
        email:email,
        password:password
    })

    if(user) {
        const token = jwt.sign({
            id:user._id
        }, JWT_USER_PASSWORD)



        res.json({
            token:token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }  
})


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