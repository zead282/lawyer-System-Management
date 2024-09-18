import mongoose from "mongoose";

const paymentschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    consultationid:{
        type:mongoose.Types.ObjectId,
        ref:'Consultation'
    }
},
{timestamps:true})


export default mongoose.models.Payment || mongoose.model('Payment',paymentschema)