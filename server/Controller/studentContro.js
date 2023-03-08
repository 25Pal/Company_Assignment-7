const studentModel=require('../Model/studentModel')
const instructorModel=require('../Model/instructorModel');
const { isValidObjectId } = require('mongoose');

const createStudent =async function(req,res){
    let data= req.body;
    const {name, subject,marks, instructorId}=data;
    if(!name || !subject || !marks || !instructorId){
        return res.send("Enter all mandatory fields");
    }
    if(!isValidObjectId(instructorId)){
        return res.send("Invalid Instructor Id , Please Provid valid Instructor Id");
    }
    if(marks > 100  || marks < 0){
        return res.send("Enter valid marks ");
    }
    let check = await instructorModel.findOne({_id:instructorId});
    if(!check){
        return res.send("This instructor is not yet register !! ");
    }
    let info=await studentModel.create(data);
    return res.status(201).send({ status: "Data Created...!", data: info });

}
const getStudent = async function(req,res){
    let filter=req.query;
    // console.log(filter)
    const {marks,subject,name}=filter;
    let x={
        isDeleted:false
    }
    if(Object.keys(filter).length ==0){
        return res.status(201).send({ status: "Please provide data to filter the student data"});
    }
  if(marks){
    x.marks=marks
  }
  if(subject){
    x.subject=subject
  }
  if(name){
    x.name=name;
  }
  let info= await studentModel.find(x).select({__v:0,createdAt:0,updatedAt:0});
  if(!info){
    return res.send("No such data found")
  }
  return res.send({DATA:info})

}
const getStudentById = async function(req,res){
    let StudentId=req.params.studentId;
    // console.log(StudentId)
    if(!isValidObjectId(StudentId)){
        return res.status(400).send({ status: "Please provide valid student id"});
    }
    let getDataById=await studentModel.find({_id:StudentId,isDeleted:false}).select({name:1,marks:1,subject:1,instructorId:1});
    if(getDataById.length ==0){
        return res.status(400).send({ status: "No entry found for this student."});
    }
    return res.send({status:true ,StudentData :getDataById })

}
const updateStudent = async function(req,res){
    let data=req.body;
    let id=req.params.studentId;//
    let dToken= req.decode;
    console.log(dToken.id,id)
    if(Object.keys(data).length ==0){
        return res.status(400).send({ status: "Provide data for updation"});
    }
    if(!isValidObjectId(id)){
        return res.status(400).send({ status: "Provid valid student id"});
    }
    let studentData=await studentModel.findOne({_id:id,isDeleted:false})
    if(!studentData){
        return res.status(400).send({ status: "Student does not exists with this id "});
    }
    if(studentData.instructorId != dToken.id ){
        return res.send(`Provided token is not for "${id}" ID, Token mismatched, Unauthorised!!`)
    }
    let update= await studentModel.findOneAndUpdate({_id:id,isDeleted:false},data,{new:true});

    return res.send({status:true ,StudentData : update }) 
}

const deleteStudent = async function(req,res){
    let dToken= req.decode;
    let id= req.params.studentId;
    if(!isValidObjectId(id)){
        return res.status(400).send({ status: "Provid valid student id"});
    }
    let checkStudent=await studentModel.findOne({_id:id,isDeleted:false});
    if(!checkStudent){
        return res.status(400).send({ status: "Data not found for deletion"});
    }
    if(checkStudent.instructorId != dToken.id ){
        return res.send({status:true,msg:`You are not allow to delete this data ,Only Instructor of this "${id}" Student can delete data, Token mismatched, Unauthorised!! `})
    }
    let deletee = await studentModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true});
    return res.send({status:"Deleted succesfully!!"})

}


module.exports={createStudent,getStudent,updateStudent,deleteStudent,getStudentById}