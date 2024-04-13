const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Students
app.post("/students", async (req, res) => {
    const students = await prisma.students.create({
        data: req.body
    });
    res.json(students);
});

app.get("/students", async (req, res) => {
    const students = await prisma.students.findMany();
    res.json(students);
});

app.get("/students/:id", async (req, res) => {
    const studentsId = parseInt(req.params.id);
    const students = await prisma.students.findUnique({
        where: { id: studentsId }
    });
    res.json(students);
});

app.put("/students/:id", async (req, res) => {
    const studentsId = parseInt(req.params.id);
    const students = await prisma.students.update({
        where: { id: studentsId },
        data: req.body
    });
    res.json(students);
});

app.delete("/students/:id", async (req, res) => {
    const studentsId = parseInt(req.params.id);
    const students = await prisma.students.delete({
        where: { id: studentsId }
    });
    res.json(students);
});


// Teachers
app.get("/getTeachers", async (req, res) => {
    const getteachers = await prisma.teachers.findMany();
    res.json(getteachers);
});


app.post("/addTeachers", async (req, res) => {

    const addnewteacher = await prisma.teachers.create({ data: req.body });
    res.json(addnewteacher);
});

app.put("/teachers/:id", async (req, res) => {
    const teacherId = parseInt(req.params.id);
    const updatedTeacher = await prisma.teachers.update({
        where: { id: teacherId },
        data: req.body
    });
    res.json(updatedTeacher);
});

app.delete("/teachers/:id", async (req, res) => {
    const id = req.params.id;

    const deleteteacher = await prisma.teachers.delete(
        {
            where: { id: parseInt(id) },
        });
    res.json(deleteteacher);
});


// Classes
app.post("/classes", async (req, res) => {
    const classes = await prisma.classes.create({
        data: req.body
    });
    res.json(classes);
});

app.get("/classes", async (req, res) => {
    const classes = await prisma.classes.findMany();
    res.json(classes);
});

app.get("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    const classes = await prisma.classes.findUnique({
        where: { id: classesId }
    });
    res.json(classes);
});

app.put("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    const classes = await prisma.classes.update({
        where: { id: classesId },
        data: req.body
    });
    res.json(classes);
});

app.delete("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    const classes = await prisma.classes.delete({
        where: { id: classesId }
    });
    res.json(classes);
});

// Courses
app.post("/courses", async (req, res) => {
    const newCourse = await prisma.courses.create({
        data: req.body
    });
    res.json(newCourse);
});

app.get("/courses", async (req, res) => {
    const courses = await prisma.courses.findMany();
    res.json(courses);
});

app.get("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = await prisma.courses.findUnique({
        where: { id: courseId }
    });
    res.json(course);
});

app.put("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    const updatedCourse = await prisma.courses.update({
        where: { id: courseId },
        data: req.body
    });
    res.json(updatedCourse);
});

app.delete("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    const deletedCourse = await prisma.courses.delete({
        where: { id: courseId }
    });
    res.json(deletedCourse);
});

app.listen(3001, () =>
    console.log('server listening on port 3001'));