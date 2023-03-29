
const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{type:String,requird:"true"},
    email:{type:String,required:"true"},
    password:{type:String,required:"true"},
    phone:String,
    adress:[],
    uploads:[]

})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel

