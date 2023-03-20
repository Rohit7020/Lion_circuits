const mongoose=require("mongoose")

const totalFilesSchema=mongoose.Schema({
    total:Number,
    type:[]

   
  
    
})

const totalFilesModal=mongoose.model("totalFiles",totalFilesSchema)

module.exports=totalFilesModal