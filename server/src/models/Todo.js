import mongoose from 'mongoose';

const todoSchema=mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
}
,
desc:{
    type:String,
    required:true,
},
isCompleted:{
    type:Boolean,
    default:false,
   
}
,

date:{
    type:Date,
    default:Date.now
}
});

export default mongoose.model("Todo",todoSchema);