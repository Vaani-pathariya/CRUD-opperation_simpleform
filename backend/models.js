const mongoose =require("mongoose");
const UserSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    phone:Number
}); 
const User=mongoose.model("User",UserSchema); 
module.exports=User;