const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient();
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

// Dashboard
app.get("/dashboard", async (req, res) => {
    try {
        const students = await prisma.students.findMany();
        const teachers = await prisma.teachers.findMany();
        const courses = await prisma.courses.findMany();
        const classes = await prisma.classes.findMany();
        res.json({
            students: students.length,
            teachers: teachers.length,
            courses: courses.length,
            classes: classes.length
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve dashboard data", error: error.message });
    }
});

// Students
// GET - All Students
app.get("/students", async (req, res) => {
    try {
        const students = await prisma.students.findMany();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve students", error: error.message });
    }
});

// POST - Create Student
app.post("/students", async (req, res) => {
    const { name, cnic, aridno, degree, shift, semester, section, courses, classes_info, password } = req.body;
    if (!name || !cnic || !aridno || !degree || !shift || !semester || !section || !courses || !classes_info) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const student = await prisma.students.create({
            data: { name, cnic, aridno, degree, shift, semester, section, courses, classes_info, password }
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Failed to create student", error: error.message });
    }
});

// PUT - Update Student
app.put("/students/:id", async (req, res) => {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
        const student = await prisma.students.update({
            where: { id: studentId },
            data: req.body
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Failed to update student", error: error.message });
    }
});

// DELETE - Remove Student
app.delete("/students/:id", async (req, res) => {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
        const student = await prisma.students.delete({
            where: { id: studentId }
        });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete student", error: error.message });
    }
});


app.put("/students/password/:id", async (req, res) => {
    const studentId = parseInt(req.params.id);
    const { password } = req.body;

    if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const updatedStudent = await prisma.students.update({
            where: { id: studentId },
            data: { password: password }
        });
        res.json({ message: "Password updated successfully", updatedStudent: { id: updatedStudent.id, name: updatedStudent.name } });
    } catch (error) {
        res.status(500).json({ message: "Failed to update student's password", error: error.message });
    }
});


// Teachers
// GET - All Teachers
app.get("/teachers", async (req, res) => {
    try {
        const teachers = await prisma.teachers.findMany();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve teachers", error: error.message });
    }
});

// POST - Create Teacher
app.post("/teachers", async (req, res) => {
    const { name, cnic, teacherid, qualification, gender, courses, password } = req.body;
    if (!name || !cnic || !teacherid || !qualification || !gender || !courses) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const teacher = await prisma.teachers.create({
            data: { name, cnic, teacherid, qualification, gender, courses, password }
        });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Failed to create teacher", error: error.message });
    }
});

// PUT - Update Teacher
app.put("/teachers/:id", async (req, res) => {
    const teacherId = parseInt(req.params.id);
    if (isNaN(teacherId)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
    }
    try {
        const teacher = await prisma.teachers.update({
            where: { id: teacherId },
            data: req.body
        });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Failed to update teacher", error: error.message });
    }
});

// DELETE - Remove Teacher
app.delete("/teachers/:id", async (req, res) => {
    const teacherId = parseInt(req.params.id);
    if (isNaN(teacherId)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
    }
    try {
        const teacher = await prisma.teachers.delete({
            where: { id: teacherId }
        });
        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete teacher", error: error.message });
    }
});


app.put("/teachers/password/:id", async (req, res) => {
    const teacherId = parseInt(req.params.id);
    const { password } = req.body;

    if (isNaN(teacherId)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const updatedTeacher = await prisma.teachers.update({
            where: { id: teacherId },
            data: { password: password }
        });
        res.json({ message: "Password updated successfully", updatedTeacher: { id: updatedTeacher.id, name: updatedTeacher.name } });
    } catch (error) {
        res.status(500).json({ message: "Failed to update teacher's password", error: error.message });
    }
});


// Classes
app.post("/classes", async (req, res) => {
    const { name, semester, section, shift, classroom, classtime, teacher, course } = req.body;
    if (!name || !semester || !section || !shift || !classroom || !classtime || !teacher || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const classes = await prisma.classes.create({
            data: req.body
        });
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to create class", error: error.message });
    }
});

app.post('/import-classes', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const workbook = require('xlsx').readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = require('xlsx').utils.sheet_to_json(worksheet, { header: 1 });

        for (const row of data) {
            const [CLASS_NAME, SEMESTER, SECTION, SHIFT, CLASSROOM, CLASS_TIME, TEACHER_ID, COURSE_CODE] = row;

            if (SHIFT !== 'EVENING' && SHIFT !== 'MORNING') continue;
            if (SECTION !== 'A' && SECTION !== 'B' && SECTION !== 'C' && SECTION !== 'D') continue;

            const teacher = await prisma.teachers.findUnique({ where: { id: parseInt(TEACHER_ID) } });
            if (!teacher || !teacher.courses.includes(COURSE_CODE)) continue;

            await prisma.classes.create({
                data: {
                    name: CLASS_NAME,
                    semester: SEMESTER,
                    section: SECTION,
                    shift: SHIFT,
                    classroom: CLASSROOM,
                    classtime: CLASS_TIME,
                    teacher: teacher.name,
                    course: COURSE_CODE,
                },
            });
        }

        res.json({ message: 'Classes imported successfully' });
    } catch (error) {
        res.status(500).json({ message: "Failed to import classes", error: error.message });
    }
});


app.get("/classes", async (req, res) => {
    try {
        const classes = await prisma.classes.findMany();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve classes", error: error.message });
    }
});

app.get("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    if (isNaN(classesId)) {
        return res.status(400).json({ message: "Invalid class ID" });
    }
    try {
        const classes = await prisma.classes.findUnique({
            where: { id: classesId }
        });
        if (classes) {
            res.json(classes);
        } else {
            res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve class", error: error.message });
    }
});

app.put("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    if (isNaN(classesId)) {
        return res.status(400).json({ message: "Invalid class ID" });
    }
    try {
        const classes = await prisma.classes.update({
            where: { id: classesId },
            data: req.body
        });
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to update class", error: error.message });
    }
});

app.delete("/classes/:id", async (req, res) => {
    const classesId = parseInt(req.params.id);
    if (isNaN(classesId)) {
        return res.status(400).json({ message: "Invalid class ID" });
    }
    try {
        const classes = await prisma.classes.delete({
            where: { id: classesId }
        });
        res.json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete class", error: error.message });
    }
});

// Courses
app.post("/courses", async (req, res) => {
    const { name, course_code, description } = req.body;
    if (!name || !course_code) {
        return res.status(400).json({ message: "Name and course code are required" });
    }
    try {
        const newCourse = await prisma.courses.create({
            data: { name, course_code, description }
        });
        res.json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Failed to create course", error: error.message });
    }
});


app.get("/courses", async (req, res) => {
    try {
        const courses = await prisma.courses.findMany();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve courses", error: error.message });
    }
});

app.get("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    try {
        const course = await prisma.courses.findUnique({
            where: { id: courseId }
        });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve course", error: error.message });
    }
});

app.put("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    try {
        const updatedCourse = await prisma.courses.update({
            where: { id: courseId },
            data: req.body
        });
        res.json(updatedCourse);
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: "Course not found" });
        } else {
            res.status(500).json({ message: "Failed to update course", error: error.message });
        }
    }
});

app.delete("/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    try {
        await prisma.courses.delete({
            where: { id: courseId }
        });
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: "Course not found" });
        } else {
            res.status(500).json({ message: "Failed to delete course", error: error.message });
        }
    }
});
// teacher login endpoint
app.post("/teachers_login", async (req, res) => {
    const { teacherid, password } = req.body;
  
    if (!teacherid || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const teacher = await prisma.teachers.findUnique({
      where: { teacherid: teacherid },
    });
  
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
  
    const isPasswordValid = await compare(password.toString(), teacher.password.toString());
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
  
    res.json({ teacher });
  });

  // Student login endpoint
app.post("/students_login", async (req, res) => {
    const { aridno, password } = req.body;
  
    if (!aridno || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const student = await prisma.students.findUnique({
      where: { aridNo: aridno },
    });
  
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
  
    const isPasswordValid = await compare(password.toString(), student.password.toString());
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
  
    res.json({ student });
  });

app.listen(3001, () =>
    console.log('server listening on port 3001'));