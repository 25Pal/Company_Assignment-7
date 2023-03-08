const express = require('express')

const Route = express.Router();
const { createStudent, getStudent, updateStudent, deleteStudent, getStudentById } = require('../Controller/studentContro')
const { createInstructor, LoginInstructor } = require('../Controller/instructorController')
const {authentication,autherization}=require('../Middleware/Auth')

Route.post('/createInstructor', createInstructor);
Route.post('/LoginInstructor', LoginInstructor);

Route.post('/createStudent', authentication,autherization,createStudent);
Route.get('/getStudentById/:studentId',getStudentById);
Route.get('/getStudent', getStudent);
Route.put('/updateStudent/:studentId',authentication, updateStudent);
Route.delete('/deleteStudent/:studentId', authentication,deleteStudent);

Route.all('/*' ,(req,res)=>{
    res.status(400).send({status: false , message:"invalid path"})})
module.exports = Route;