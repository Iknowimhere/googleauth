const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    username:String,
    googleId:String
}) 

module.exports=model("user",userSchema);