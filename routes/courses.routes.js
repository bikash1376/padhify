const express = require('express');
const { courseModel } = require('../db');
const courseRouter = express.Router();


    courseRouter.get('/', (req, res) => {
        res.json("Padhify home")
    })


    courseRouter.get('/preview', async (req, res) => {
        const courses = await courseModel.find({});

        res.json({courses})
    })

module.exports =  {courseRouter:courseRouter};

