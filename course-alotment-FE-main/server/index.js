const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//Total students in dashbord
//const getStudents(){
// return  app.get("/getStudents", async (req,res) => {

//Total students in dashbord
app.get("/getTotalStudents", async (req, res) => {
    const Totalstudents = await prisma.students.count();
    res.json(Totalstudents);
});
//}

//Total Teachers in dashboard
app.get("/getTotalTeachers", async (req, res) => {
    const Totalteachers = await prisma.teachers.count();
    res.json(Totalteachers);
});


//Total classes in dashboard
app.get("/getTotalClasses", async (req, res) => {
    const Totalclasses = await prisma.classes.count();
    res.json(Totalclasses);
});


//Total reports in dashboard
app.get("/getTotalreports", async (req, res) => {
    const Totalreports = await prisma.reports.count();
    res.json(Totalreports);
});


// Student CRUD operation in student table


app.get("/getStudents", async (req, res) => {
    const getstudents = await prisma.students.findMany();
    res.json(getstudents);
});


app.post("/", async (req, res) => {

    const newstudent = await prisma.students.create({ data: req.body });
    res.json(newstudent);
});

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newage = req.body.age;
    const updatestudent = await prisma.students.update({ where: { id: parseInt(id) }, data: { age: newage }, });
    res.json(updatestudent);
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const deletestudent = await prisma.students.delete(
        {
            where: { id: parseInt(id) },
        });
    res.json(deletestudent);
});


// Teachers CRUD operation in Teachers table


app.get("/getTeachers", async (req, res) => {
    const getteachers = await prisma.teachers.findMany();
    res.json(getteachers);
});


app.post("/addTeachers", async (req, res) => {

    const addnewteacher = await prisma.teachers.create({ data: req.body });
    res.json(addnewteacher);
});

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newage = req.body.age;
    const updateteacher = await prisma.teachers.update({ where: { id: parseInt(id) }, data: { age: newage }, });
    res.json(updateteacher);
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const deleteteacher = await prisma.teachers.delete(
        {
            where: { id: parseInt(id) },
        });
    res.json(deleteteacher);
});


// Teachers CRUD operation in Teachers table


app.get("/getClass", async (req, res) => {
    const getclass = await prisma.classes.findMany();
    res.json(getclass);
});


app.post("/addClass", async (req, res) => {

    const addnewclass = await prisma.classes.create({ data: req.body });
    res.json(addnewclass);
});

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newage = req.body.age;
    const updateclasses = await prisma.classes.update({ where: { id: parseInt(id) }, data: { age: newage }, });
    res.json(updateclasses);
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const deleteclasses = await prisma.classes.delete(
        {
            where: { id: parseInt(id) },
        });
    res.json(deleteclasses);
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