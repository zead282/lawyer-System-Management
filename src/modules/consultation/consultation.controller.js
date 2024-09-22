
import {Consultation} from "../../../db/collections/collections.index.js";

////add consultation by owner only
export const addconsultation=async(req,res,next)=>{

    const{title,content,price}=req.body

    const cons=await Consultation.create({title,content,price})

    res.status(200).json({message:"addedd succefully",cons})
}

////delete Consultation by owner only

export const deleteConsultation=async(req,res,next)=>{

    const{consid}=req.params

    ///find Consultation
    const isexist=await Consultation.findByIdAndDelete(consid);

    res.status(200).json({message:"deleted successfuly"})
}

///update by owner
export const updateConsulattion=async(req,res,next)=>{

    const{consid}=req.params
    const{title,content,price}=req.body

    ///check
    const isexist=await Consultation.findById(consid);
    if(!isexist) return next(Error("not found",400));

    if(title) isexist.title=title
    if(content) isexist.content=content
    if(price) isexist.price=price

    res.status(200).json({data:isexist})
}

//get consultations by all users
export const getconsultations=async(req,res,next)=>{
    
    const consultations=await Consultation.find()
    res.status(200).json({data:consultations})
}