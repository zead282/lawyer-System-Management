import mongoose from "mongoose";

const consultationschema=new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     content:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     }
},
{timestamps:true})

export default mongoose.models.Consultation || mongoose.model('Consultation',consultationschema)