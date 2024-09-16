import Subartical from "../../../db/collections/subartical.collection.js";
import artical from "../../../db/collections/artical.js";
import cloudinaryConnection from "../../utils/cloudinary.js";
import generateuniquestring from "../../utils/generate-unique-str.js";
///add subartical by owner
export const add_sub_artical=async(req,res,next)=>{
   
    ///destructing data
    const{_id}=req.authUser
    const{title,content}=req.body
    const{articalid}=req.params

    ///check on artical
    const parentartical=await artical.findById(articalid)
    if(!parentartical) return next(Error('artical not found',400))

       let data

       ////conten with image
       if(req.file){
        const folderid=generateuniquestring(4)
        const{secure_url,public_id}=await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/parents-articals/${parentartical.folderid}/${folderid}`
        })
       
        req.folder=`${process.env.MAIN_FOLDER}/parents-articals/${parentartical.folderid}/${folderid}`

         data={
            added_by:_id,image:{secure_url,public_id},title,content,articalid,folderid
        }
    }

///if we dont need to upload image
    if(!req.file){
         data={
            added_by:_id,title,content,articalid
        }
    }
    
    
    

    ///generate sub-artical
    const newsubartical=await Subartical.create(data);

    /////////////////////////////////////////if any error this api to delete model from database
    req.saveddocument={model:Subartical,_id:newsubartical._id}

    res.status(200).json({message:"added",newsubartical})
}


////get specific sub-artical

export const sp_sub_artical = async(req,res,next)=>{

    const {articalid}=req.params;
    
    ///check on artical availability
    const articall=await artical.findById(articalid)
    if(!articall) return next(Error("artical not found",400))
    
    const subArtical=await Subartical.findOne({articalid:articall._id})    
    
    res.status(200).json({data:subArtical})    
    
}

////update specific sub-artical

export const update_sub_artical = async(req,res,next)=>{
    
    ///destructing data
    const{title,content,oldpublicid}=req.body
    const{articalid}=req.params

    ///check on artical
    const articall=await Subartical.findById(articalid);
    if(!articall) return next(Error("sub-artical not found",404))
    
    ///update title
    if(title){
        articall.title=title
    }    
    ///update content
    if(content){
        articall.content=content
    }
    //update image
    if(oldpublicid){
        if(!req.file) return next(Error("image required"))
          
         const newpublicid=oldpublicid.split(`${articall.folderid}/`)[1]   
         const folderr=oldpublicid.split(`${articall.folderid}/`)[0]

         const{secure_url}=await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${folderr}/${articall.folderid}`,
            public_id:newpublicid
         })
         articall.image.secure_url=secure_url

         req.folder=`${folderr}/${articall.folderid}`
    }
    await articall.save()
    res.status(200).json({message:"sub-artical updated successfuly",data:articall})

}

///delete sub-artical

export const delete_sub_artical = async(req,res,next)=>{

    const{articalid}=req.params

    //find artical
     const artical=await Subartical.findById(articalid);
     if(!artical) return next(Error("artical not found",400))
     
     //delete sub-artical
    const deletee= await Subartical.findByIdAndDelete(articalid);
     res.status(200).json({message:"artical deleted success"});   

}