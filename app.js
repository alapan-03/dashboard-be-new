const express = require('express');
const mongoose = require('mongoose');

const app = express();

const cors = require("cors")

require('dotenv').config(); 

const PORT_NO = process.env.PORT;

// const allowedOrigins = ['http://localhost:5173', 'https://www.youtube.com', 'http://127.0.0.1:8080'];

// const allowedOrigins = ['http://localhost:3000','http://localhost:5173', 'https://www.youtube.com', 'http://127.0.0.1:8080'];


// app.use(cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
  
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         // If the origin is in the allowedOrigins list, allow the request
//         callback(null, true);
//       } else {
//         // Otherwise, block the request
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true // Allow cookies or authentication if needed
//   }));

// import routes
const authRoutes = require('./Router/User_Router/authRoutes');
const createClassroomRoute = require('./Router/Classroom_Router/createClassroomRoute');
const educationRoutes = require('./Router/Classroom_Router/createEducationRoutes');
const resourceRouter = require('./Router/Classroom_Router/resourceRouter');

const studentRouter = require('./Router/User_Router/studentRoute');
const teacherRouter = require('./Router/User_Router/teacherRouter');

const studentAssignmentRoutes = require('./Router/Classroom_Router/studentAssignmentRoute'); 
const joinClassroomRoute = require('./Router/Classroom_Router/joinClassroomRoute');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

const MONGO_URI = process.env.MONGODB_URI

// Connect to MongoDB
// console.log(typeof process.env.MONGO_URI)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("Some error occurred while connecting to DB", err);
    });


// Route to handle auth login and register
app.use('/auth', authRoutes);

// Route to create Classroom
app.use('/', createClassroomRoute);

// Use education routes
app.use('/education', educationRoutes);

// student assignment route
app.use('/student', studentAssignmentRoutes);

//join classroom route
app.use('/classroom', joinClassroomRoute);


app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/teacher", teacherRouter);


// Start the server
app.listen(PORT_NO, () => {
    console.log(`Server listening at ${PORT_NO}`);
});
