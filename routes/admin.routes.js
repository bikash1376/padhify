const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/signup', (req, res) => {
    res.json('Admin Signup endpoint')
})

adminRouter.get('/login', (req, res) => {
    res.json('Admin login endpoint')
})

adminRouter.get('/create-course', (req, res) => {
    res.json('Admin create course endpoint')
})

adminRouter.get('/update-course', (req, res) => {
    res.json('Admin update course endpoint')
})


adminRouter.get('/course/bulk', (req, res) => {
    res.json('Admin bulk course endpoint')
})


module.exports = {
    adminRouter:adminRouter
}