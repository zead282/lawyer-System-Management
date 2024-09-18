
import consultation from "../../../db/collections/consultation.js";

////add consultation by owner only
export const addconsultation=async(req,res,next)=>{

    const{title,content,price}=req.body

    const cons=await consultation.create({title,content,price})

    res.status(200).json({message:"addedd succefully",cons})
}

////delete consultation by owner only

export const deleteconsultation=async(req,res,next)=>{

    const{consid}=req.params

    ///find consultation
    const isexist=await consultation.findByIdAndDelete(consid);

    res.status(200).json({message:"deleted successfuly"})
}

///update by owner
export const updateconsulattion=async(req,res,next)=>{

    const{consid}=req.params
    const{title,content,price}=req.body

    ///check
    const isexist=await consultation.findById(consid);
    if(!isexist) return next(Error("not found",400));

    if(title) isexist.title=title
    if(content) isexist.content=content
    if(price) isexist.price=price

    res.status(200).json({data:isexist})
}

//get consultations by all users
export const getconsultations=async(req,res,next)=>{
    
    const consultations=await consultation.find()
    res.status(200).json({data:consultations})
}