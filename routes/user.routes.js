const { Router } = require('express');
const { userModel, purchaseModel } = require('../db');
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = require('../config')

const userRouter = Router();

userRouter.get('/signup', async (req, res) => {
    const {email, password, firstName, lastName, }  = req.body;

    //adding validation (zod prob)
    //hashing the password 

    await userModel.create({
        email:email,
        password: password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message: "Signup succeeded"
    })
})

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