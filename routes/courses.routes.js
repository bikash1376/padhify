const express = require('express');
const coursesRouter = express.Router();


    coursesRouter.get('/', (req, res) => {
        res.json("All courses at once place")
    })


module.exports =  {coursesRouter};