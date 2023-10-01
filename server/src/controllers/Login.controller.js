import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const Login=async (req,res)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const {username,password}=req.body;
        const user=await User.findOne({username:username});
        if(!user){
          return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"username or password is incorrect"));
        }
         
        const verified=bcrypt.compareSync(password,user.password);

        if(!verified){
            return res.json(
                jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"username or password is incorrect")
            );
        }
        // let uid = user["_id"];

        const token=jwt.sign({userId:user._id},JWT_TOKEN_SECRET)

      res.cookie("login", token, { httpOnly: true });

    //   const token="hello";
      return res.json(jsonGenerate(StatusCode.SUCCESS,"LOGGED IN SUCCESSFULLY",{userId:user._id,token:token}))
    }

    //error checking
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"validationerror",errors.mapped()))
};

export default Login;