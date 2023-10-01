import  express  from "express";
import apiRoute, { apiProtected } from "./src/routes/api.js";
import mongoose from "mongoose";
import AuthMiddleWare from "./src/middleware/AuthMiddleware.js";
import cors from 'cors'
const app=express();
const PORT=10000;

const db_link='mongodb+srv://admin:IqJZpAxm5pEDP5rd@cluster0.fesaujr.mongodb.net/todo?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    //console.log(db)
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
});

app.use(cors());
app.use(express.json())
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleWare,apiProtected);
app.listen(PORT,()=>console.log('server is running'));

