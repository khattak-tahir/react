const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma= new PrismaClient();
app.use(express.json());
//Total students in dashbord
//const getStudents(){
  // return  app.get("/getStudents", async (req,res) => {

//Total students in dashbord
 app.get("/getTotalStudents", async (req,res) => {
        const Totalstudents = await prisma.students.count();
        res.json(Totalstudents);
    });
//}

//Total Teachers in dashboard
app.get("/getTotalTeachers", async (req,res) => {
    const Totalteachers = await prisma.teachers.count();
    res.json(Totalteachers);
});


//Total classes in dashboard
app.get("/getTotalClasses", async (req,res) => {
    const Totalclasses = await prisma.classes.count();
    res.json(Totalclasses);
});


//Total reports in dashboard
app.get("/getTotalreports", async (req,res) => {
    const Totalreports = await prisma.reports.count();
    res.json(Totalreports);
});


// Student CRUD operation in student table


app.get("/getStudents", async (req,res) => {
    const getstudents = await prisma.students.findMany();
    res.json(getstudents);
});


app.post("/", async (req,res) => {
   
    const newstudent = await prisma.students.create({data: req.body});
    res.json(newstudent);
});

app.put("/:id", async (req,res) => {
    const id= req.params.id;
    const newage =req.body.age;
    const updatestudent = await prisma.students.update({where:{id: parseInt(id)},data: {age: newage},});
    res.json(updatestudent);
});

app.delete("/:id", async (req,res) => {
    const id= req.params.id;
    
    const deletestudent = await prisma.students.delete(
        {where:{id: parseInt(id)},
        });
    res.json(deletestudent);
});


// Teachers CRUD operation in Teachers table


app.get("/getTeachers", async (req,res) => {
    const getteachers = await prisma.teachers.findMany();
    res.json(getteachers);
});


app.post("/addTeachers", async (req,res) => {
   
    const addnewteacher = await prisma.teachers.create({data: req.body});
    res.json(addnewteacher);
});

app.put("/:id", async (req,res) => {
    const id= req.params.id;
    const newage =req.body.age;
    const updateteacher = await prisma.teachers.update({where:{id: parseInt(id)},data: {age: newage},});
    res.json(updateteacher);
});

app.delete("/:id", async (req,res) => {
    const id= req.params.id;
    
    const deleteteacher = await prisma.teachers.delete(
        {where:{id: parseInt(id)},
        });
    res.json(deleteteacher);
});


// Teachers CRUD operation in Teachers table


app.get("/getClass", async (req,res) => {
    const getclass = await prisma.classes.findMany();
    res.json(getclass);
});


app.post("/addClass", async (req,res) => {
   
    const addnewclass = await prisma.classes.create({data: req.body});
    res.json(addnewclass);
});

app.put("/:id", async (req,res) => {
    const id= req.params.id;
    const newage =req.body.age;
    const updateclasses = await prisma.classes.update({where:{id: parseInt(id)},data: {age: newage},});
    res.json(updateclasses);
});

app.delete("/:id", async (req,res) => {
    const id= req.params.id;
    
    const deleteclasses = await prisma.classes.delete(
        {where:{id: parseInt(id)},
        });
    res.json(deleteclasses);
});

app.listen(3001, () => 
      console.log('server listening on port ${3001}'));