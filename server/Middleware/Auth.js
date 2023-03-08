const instructorModel = require('../Model/instructorModel')
const jwt= require('jsonwebtoken')
const { isValidObjectId } = require('mongoose');
const authentication= async function (req,res,next){
    let token= req.headers["key"];
    if(!token){
        return res.status(400).send({status:false,message:"Please provide token"})
    }
    jwt.verify(token , "Instructordata",(err,decode)=>{
        if(err){
            console.log(err.message)
            return res.status(401).send({status:false,message:err.message})
        }else{
            req.decode=decode;
            // console.log(decode)
            next();
        }

    })
}
const autherization = async function(req,res,next){
        let dToken= req.decode;
        if(!isValidObjectId(req.body.instructorId)){
            return res.status(400).send({status:false,message:"Please Provide valid Instructor Id"})
        }
        let check= await instructorModel.findOne({_id:req.body.instructorId});
        if(!check){
            return res.status(400).send({status:false,message:"This instructor is not yet register !!"})
        }
        console.log(dToken.id ,req.body.instructorId)
        if(dToken.id != req.body.instructorId){
            return res.send(`Provided token is not for "${req.body.instructorId}" ID, Token mismatched, Unauthorised!!`)
        }
        next();
}

module.exports={authentication,autherization}