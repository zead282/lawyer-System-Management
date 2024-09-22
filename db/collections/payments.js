import mongoose from "mongoose";
import { paymentStatus } from "../../src/utils/utils.index.js";

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
    },
    orderid:{
        type:String
    },
    paymentStatus:{
        type:String,
        enums:Object.values(paymentStatus),
        default:paymentStatus.pending
    }
},
{timestamps:true})


export const Payment =  mongoose.models.Payment || mongoose.model('Payment',paymentschema)