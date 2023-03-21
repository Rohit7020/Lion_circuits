
const Model=require("./Model/user.model");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const userModel=require("./Model/user.model")
const userRouter = require("./Routes/user.route");
const {getEmailFromToken}=require("./utility/getEmailFromToken")
const {getTokenFromReq}=require("./utility/getTokenFromReq")
const path = require("path");
module.require("dotenv").config();
const { connection } = require("./config/db");
const app = express();




app.use(express.json())
app.use(cors());

const PORT=process.env.PORT||5000
app.use("/user",userRouter)

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "./uploads"); },
  filename: (req, file, cb) => {cb(null, Date.now() + "--" + file.originalname);},
});


const upload = multer({ storage: fileStorageEngine });


app.post("/upload_file", upload.single("image"),async (req, res) => {
console.log(req.headers.authorization)
  const token= getTokenFromReq(req)
  console.log("token",token)
  const Email=await getEmailFromToken(token)
  console.log("email",Email)

  let user= await userModel.findOne({"email": Email})
   console.log("user", user)
 if(!user){return res.send("token had been changed")}

    let new_upload=user.uploads
  new_upload.push(req.file)

  console.log("newapple",new_upload)

   let an=await userModel.findOneAndUpdate(Email, {$set: {'uploads': new_upload}});
    console.log("an",an)
  return res.send(" FIle upload success");
});
 
app.get("/display_files",async(req,res)=>{
  const token= getTokenFromReq(req)
  console.log("token")
  const Email=await getEmailFromToken(token)
  console.log("email",Email)

  let user= await userModel.findOne({"email": Email})
res.send(user)
})
app.get("/download/:file_name",(req,res)=>{

res.download(path.resolve(`./uploads/${req.params.file_name}`))
})

app.listen(PORT,async()=>{
  try {
      await connection;
      console.log("connected",PORT);
      
  } catch (error) {
      console.log("\n-----------------error-----------------\n",error)
  }
 
})
