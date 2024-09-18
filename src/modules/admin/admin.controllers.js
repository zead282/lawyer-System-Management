/**
 * admin => can add lawyer and controller his CRUD operations
 * 
 */

import { User } from "../../../db/collections/collections.index.js"
import cloudinaryConnection from "../../utils/cloudinary.js"
import ErrorClass from "../../utils/Error-class.js"
import generateuniquestring from "../../utils/generate-unique-str.js"
import { updateData, userRole } from "../../utils/utils.index.js"
import bcryptjs from "bcryptjs"

export const addLawyer = async (req, res, next) => {
    const {name,email,phone,password} = req.body
    // check if lawyer exist
    const isUserExist = await User.findOne({email})
    if(isUserExist) return next(new ErrorClass("Lawyer already exist", 400))

    // hash password
    const hashPassword = bcryptjs.hashSync(password,9)
    //image
    if(!req.file) return next(new Error("image is require"));
    const folderid=generateuniquestring(4);

    const{secure_url,public_id}= await cloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${process.env.MAIN_FOLDER}/Lawyer/${folderid}`
    })
    // create new user
    const newLawyer = new User({
        name,
        email,
        phone,
        password: hashPassword,
       folderid,
       userImage:{secure_url,public_id},
        userRole: userRole.lawyer
    })
    await newLawyer.save()
    res.status(200).json({message: "Lawyer created successfully"})
}


export const getAllLawyers = async (req, res, next) => {

    const lawyers = await User.find({userRole: userRole.lawyer})
    if(!lawyers.length) return next(new ErrorClass("No lawyer found", 404))
    res.status(200).json(lawyers)
}


export const getSpecificLawyer = async (req, res, next) => {
    const {id} = req.params
    const lawyer = await User.findById(id)
    if(!lawyer) return next(new ErrorClass("Lawyer not found", 404))
    res.status(200).json(lawyer)
}   


export const deleteLawyer = async (req, res, next) => {
    const {id} = req.params
    const lawyer = await User.findOne({_id:id})
    if (!lawyer) return next(new ErrorClass("Lawyer not found", 404))
  
   // delete image from cloudinary
    const folderpath=lawyer.userImage.public_id.split(`${lawyer.folderid}/`)[0] + lawyer.folderid 
    try{
        await cloudinaryConnection().api.delete_resources_by_prefix(folderpath)
        await cloudinaryConnection().api.delete_folder(folderpath);
    }
    catch(err){
        next(new ErrorClass(err.error.message,err.error.http_code))  
    }
    
    // delete lawyer from db
    await User.deleteOne({_id:id})
    
    res.status(200).json({message: "Lawyer deleted successfully"})
}



export const updateLawyer = async (req, res, next) => {
    const  {id} = req.params
    const lawyer = await User.findById(id)
    if (!lawyer) return next(new ErrorClass("Lawyer not found", 404))
    
    // update date of lawyer fully or partially 
    const updateLawyer = updateData(lawyer, req.body)

    // if image is uploaded
    if(req.file){
        const newPublicId = lawyer.userImage.public_id.split(`${lawyer.folderid}/`)[1];
        const{secure_url} = await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/Lawyer/${lawyer.folderid}`,
            public_id:newPublicId
        })
        if (!secure_url) return next(new ErrorClass("image not uploaded", 400))
        updateLawyer.userImage.secure_url=secure_url
    }
    // update new data in db
    await updateLawyer.save()
    res.status(200).json({message: "Lawyer updated successfully"})

}