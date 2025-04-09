const { Router } = require('express');

const userRouter = Router();

userRouter.get('/signup', (req, res) => {
    res.json("User signup endpoint")
})

userRouter.get('/login', (req, res) => {
    res.json("User login endpoint")
})


userRouter.get('/purchases', (req, res) => {
    res.json("User purchases endpoint")
})

module.exports = {
    userRouter
}