const express = require('express');
const app = express();
const { courseRouter }  = require('../backend/routes/courses.routes')
// const { userRouter }  = require('../backend/routes/user.routes')
const {userRouter} = require('../backend/routes/user.routes');
const { adminRouter } = require('./routes/admin.routes');

// app.use(express.json());

// ---------- Public Home ----------
app.use('/', courseRouter);

// ---------- User Routes ----------
app.use('/api/users/', userRouter);

// app.post('/api/courses/:courseId/purchase', (req, res) => {
//     res.json("Purchase a course");
// });



// ---------- Admin Routes ----------
app.use('/api/admin/', adminRouter);

// ---------- Not Found Handler ----------
app.use((req, res) => {
    res.status(404).json("Page Not Found");
});

app.listen(3000, () => {
    console.log("running");
});
