const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const { courseRouter }  = require('../backend/routes/courses.routes')
const {userRouter} = require('../backend/routes/user.routes');
const { adminRouter } = require('./routes/admin.routes');
// const { default: mongoose } = require('mongoose');


const app = express();
app.use(express.json());

app.use('/', courseRouter);
app.use('/api/users/', userRouter);

// app.post('/api/courses/:courseId/purchase', (req, res) => {
//     res.json("Purchase a course");
// });


app.use('/api/admin/', adminRouter);



app.use((req, res) => {
    res.status(404).json("Page Not Found");
});




async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
        
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error.message);
        process.exit(1); // Optional: exit the process if DB connection fails
    }
}

main();
