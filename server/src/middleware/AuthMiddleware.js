import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
import jwt from "jsonwebtoken"
const AuthMiddleWare=(req,res,next)=>{
    
    if(req.headers["auth"]===undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"access denied"))
    }
    const token = req.headers['auth'];
    // let token;
    // if(req.cookies.login){
    //       token=req.cookies.login;
    //       let payload=jwt.verify
    // }
    
    // const token="hello"
    // console.log(token);
    try{
        // console.log("hello");
        //here there is a problem not able to verify correctly
        const decoded=jwt.verify(token,JWT_TOKEN_SECRET);
        
        // console.log(decoded);
        req.userId=decoded.userId;
        return next();
    }
    catch(error){
      return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"iNVALID TOKEN"))
    }
}
export default AuthMiddleWare;