const express = require('express');
const courseRouter = express.Router();


    courseRouter.get('/', (req, res) => {
        res.json("Padhify home")
    })


    courseRouter.get('/all-courses', (req, res) => {
        res.json("All courses")
    })

module.exports =  {courseRouter};

