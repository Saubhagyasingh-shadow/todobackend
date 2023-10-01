import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import userSchema from "../models/userModel.js";
import User from "../models/userModel.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';

const Register=async (req,res)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
    const {name,username,password,email}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    //save to db
    console.log(req.body);
    const userExist=await User.findOne({  $or: [{
        email:email
    },{
        username:username
    }]

    })
   
    if(userExist){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"USER OR  EMAIL ALReady exist"))
    }


    try{
        // console.log("hello")
        const result=await User.create({
            username:username,
            name:name,
            email:email,
            password:hashPassword
        })
         console.log(result);
        const token=jwt.sign({userId:result._id},JWT_TOKEN_SECRET)
        // const token="hello"
        res.json(jsonGenerate(StatusCode.SUCCESS,"Registration successfull",{userId:result._id,token:token}));


    }
    catch(err){
         console.log(err);
    }
}
    ///ned to find where the mistake
    // res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"vALIDATION ERROR",errors.mapped()));
}

export default Register;