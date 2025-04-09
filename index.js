const express = require('express');
const app = express();
const { coursesRouter }  = require('../backend/routes/courses.routes')

// app.use(express.json());

// ---------- Public Home ----------
app.get('/', coursesRouter);

// ---------- User Routes ----------
app.post('/api/users/signup', (req, res) => {
    res.json("User signup");
});

app.post('/api/users/login', (req, res) => {
    res.json("User login");
});

app.get('/api/courses', (req, res) => {
    res.json("All courses");
});

app.post('/api/courses/:courseId/purchase', (req, res) => {
    res.json("Purchase a course");
});

app.get('/api/users/purchased-courses', (req, res) => {
    res.json("User's purchased courses");
});

// ---------- Admin Routes ----------
app.post('/api/admin/signup', (req, res) => {
    res.json("Admin signup");
});

app.post('/api/admin/login', (req, res) => {
    res.json("Admin login");
});

app.post('/api/admin/courses', (req, res) => {
    res.json("Create a new course");
});

app.delete('/api/admin/courses/:courseId', (req, res) => {
    res.json("Delete a course");
});

app.post('/api/admin/courses/:courseId/content', (req, res) => {
    res.json("Add content to a course");
});

// ---------- Not Found Handler ----------
app.use((req, res) => {
    res.status(404).json("Page Not Found");
});

app.listen(3000, () => {
    console.log("running");
});
