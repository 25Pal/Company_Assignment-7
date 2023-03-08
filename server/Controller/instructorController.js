const instructorModel = require('../Model/instructorModel')
const jwt = require('jsonwebtoken');

const createInstructor = async function (req, res) {
    
    try {
        let data = req.body;
        const{name,email,password}=data;

        if(!name ||!email ||!password){
            return res.send("Enter all mandatory fields");
        }
        let check= await instructorModel.findOne({email:email});
        console.log(check)
        if(check){
            return res.status(400).send({ status: "Email Already exist" });
        }
        let Instructor = await instructorModel.create(data);
        return res.status(201).send({ status: "Register Succesfully...", data: Instructor });
       } catch (err) {
        return res.send(err.message);
    }
}

const LoginInstructor = async function (req, res) {
    let data = req.body;//email,password
    let { email, password } = data;
    if(!email ||!password){
        return res.status(400).send("Provid Creadentials...");
    }
    let findData = await instructorModel.findOne({ email: email, password: password });
    if (!findData) {
        return res.status(400).send("Invalid Creadentials...");
    }
    const Token = jwt.sign({ id: findData._id }, "Instructordata");
    return res.status(201).send({ Status: "Login successfully!!", Token: Token });
}

module.exports = { createInstructor, LoginInstructor }