const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma= new PrismaClient();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
app.use(bodyParser.json());

// Login endpoint

const cors = require("cors");
// const port = 3306;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Create MySQL connection


// // Connect to MySQL
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL database");
// });

// Student login endpoint
app.post("/students", async (req, res) => {
  const { aridno, password, role } = req.body;
if(!aridno||!password){
  return res.status(400).json({ message: "All fields are required" });
}
try{
  const student = await prisma.students.findUnique({
    data: { aridno, password }
});
res.json(student);
} catch (error) {
res.status(500).json({ message: "Invalid Credentials", error: error.message });
}
});
//   // Query MySQL database to authenticate student
//   const query = `SELECT * FROM students WHERE aridno = ? AND password = ?`;
//   db.query(query, [aridno, password], (err, results) => {
//     if (err) throw err;

//     if (results.length > 0) {
//       // Generate JWT token
//       const token = jwt.sign({ aridno: aridno, role: role }, "secret_key", {
//         expiresIn: "24h",
//       });

//       // Return JWT token in response
//       res.json({ token: token });
//     } else {
//       // Return error if authentication fails
//       res.status(401).json({ error: "Invalid email or password" });
//     }
//   });
// });

// Teacher login endpoint

app.post("/teachers", async (req, res) => {
  const { teacherid, password, role } = req.body;
if(!teacherid||!password){
  return res.status(400).json({ message: "All fields are required" });
}
try{
  const teacher = await prisma.teachers.findUnique({
    data: { teacherid, password }
});
res.json(teacher);
} catch (error) {
res.status(500).json({ message: "Invalid Credentials", error: error.message });
}
});
// app.post("/teachers", (req, res) => {
//   const { teacherid, password, role } = req.body;

//   // Query MySQLdatabase to authenticate teacher
//   const query = `SELECT * FROM teachers WHERE teacherid = ? AND password = ?`;
//   db.query(query, [teacherid, password], (err, results) => {
//     if (err) throw err;

//     if (results.length > 0) {
//       // Generate JWT token
//       const token = jwt.sign({ teacherid: teacherid, role: role }, "secret_key", {
//         expiresIn: "24h",
//       });

//       // Return JWT token in response
//       res.json({ token: token });
//     } else {
//       // Return error if authentication fails
//       res.status(401).json({ error: "Invalid email or password" });
//     }
//   });
// });





// // Route to handle sending email
// app.post('/send-email', (req, res) => {
//   const { name, email, message } = req.body;

//   // Create a transporter with your SMTP settings
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password',
//     },
//   });

//   // Email content
//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: 'Tahirkhattak456@gmail.com', // Receiver's email
//     subject: 'New Contact Form Submission',
//     html: `
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Message:</b> ${message}</p>
//     `,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.send('Email sent successfully');
//     }
//   });
// });

app.listen(3001, () => 
      console.log('server listening on port ${3001}'));