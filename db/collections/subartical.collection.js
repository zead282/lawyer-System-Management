import mongoose from "mongoose";


const subarticalschema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        secure_url:{type:String},
        public_id:{type:String,unique:true}
    },
    folderid:{
        type:String,
    },
    added_by:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    articalid:{
        type:mongoose.Types.ObjectId,
        ref:"Artical",
        required:true
    }



}
,{timestamps:true})


export default mongoose.models.Subartical || mongoose.model('Subartical',subarticalschema)