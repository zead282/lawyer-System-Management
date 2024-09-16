
import artical from "../../../db/collections/artical.js";
import { API_Features } from "../../utils/api-features.js";
import cloudinaryConnection from "../../utils/cloudinary.js";
import generateuniquestring from "../../utils/generate-unique-str.js";

///owner only
export const addartical = async(req,res,next)=>{
    
    const{title}=req.body

    ///check on title
    const Title=await artical.findOne({title})
    if(Title) return next(Error("change artical title"))

    //image
    if(!req.file) return next(new Error("image is require"));
    const folderid=generateuniquestring(4);

    const{secure_url,public_id}= await cloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${process.env.MAIN_FOLDER}/parents-articals/${folderid}`
    })

    const articaldata={
        title,image:{secure_url,public_id},folderid
    }

    const newartical=await artical.create(articaldata)
    res.status(200).json({
        message:"artical created succe",
        date:newartical
    })


}


export const getall_articals = async(req,res,next)=>{
     const{page,size}=req.query;
    const result=new API_Features(req.query,artical.find()).pagination({page,size})

    const articals=await result.mongoosequery

    res.status(200).json({data:articals})

}
//owner only
export const update_artical = async(req,res,next)=>{

    const{articalid}=req.params
    const{title,oldpublicid}=req.body

    //find artical
    const articalisexist=await artical.findById(articalid);
    if(!articalisexist) return next(Error("artical not found",404))

    if(title)
        articalisexist.title=title
    
    ///if update image
    if(oldpublicid){
            if(!req.file) return next(Error('image is requeried',400))
        
        const newpublicid=oldpublicid.split(`${articalisexist.folderid}/`)[1];
        
        const{secure_url}=await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/parents-articals/${articalisexist.folderid}`,
            public_id:newpublicid
        })
        articalisexist.image.secure_url=secure_url
    }
    await articalisexist.save()

    res.status(200).json({message:"artical updated",data:articalisexist})

}

export const delete_artical = async(req,res,next)=>{

    const{articalid}=req.params

    //find artical
    const articaisexist=await artical.findById(articalid)
    if(!articaisexist) return next(Error("artical not found",400))
    
    ///delete image
    const folderpath=articaisexist.image.public_id.split(`${articaisexist.folderid}/`)[0] + articaisexist.folderid
    
    await cloudinaryConnection().api.delete_resources_by_prefix(folderpath)
    await cloudinaryConnection().api.delete_folder(folderpath);

    //delete document from db
    const delteartical=await artical.findByIdAndDelete(articalid);
    res.status(200).json({message:"artical deleted successfully"});
}