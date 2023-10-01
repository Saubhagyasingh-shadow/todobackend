import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import Todo from "../models/Todo.js";
export const createTodo=async (req,res)=>{
   const error=validationResult(req);
   if(!error.isEmpty()){
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo is requires",error.mapped()));
   }
   try{
    // console.log("this is result")
      const result=await Todo.create({
        userId:req.userId,
        desc:req.body.desc,
      });
    //   console.log("this is result")
    //   console.log(result);
      if(result){
        const user=await User.findOneAndUpdate({_id:req.userId},{
            $push:{todos:result},
        });
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created successfully",result))
      }

   }catch(error){
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"went wrong",error))
   }
    
}