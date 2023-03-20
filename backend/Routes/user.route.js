const {Router}=require("express");
const userModel = require("../Model/user.model")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');





//Router
const userRouter=Router();
//create account
userRouter.post("/createAccount",async(req,res)=>{

  console.log(req.body)
   const {password,email,phone_number,adress}=req.body
    if(password==null || email==null ){
        
        return res.send("enter details properly")
    }
  const userExist=await userModel.findOne({email})
  if(userExist){
    return res.send("User exist with same email")
  }
  console.log(userExist)
   
    
    //check token and send continue

try {
    bcrypt.hash(password,8,async function(err, hash) {
        //console.log(hash);
        
        if(!hash){return res.send({message:"Something went wrong"})}
        const Data=userModel({email,password:hash,phone_number,adress})
        await Data.save()
        res.send({message:"Successfully Account created"})
            });} catch (error) {return res.send(error)}
});

//login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    if(email==null ||password==null){return (res.send("Invalid Credentialsn"))}
    
    let User=await userModel.findOne({email})      
    if(!User){return res.send({message:"Invalid Credentialss"})}
   
    
    bcrypt.compare(password, User.password,function(err, data) {
        console.log(password,User.password,data)
        try {
            if(!data){return res.send({message:"Invalid Credentials"})}
            var token = jwt.sign({ email: email },process.env.SECRET);
            console.log("token",token)
           return res.send({message:"Login succesful",token})
        } catch (error) {
            res.send(err)
            
        }});
    })
 






module.exports=userRouter
