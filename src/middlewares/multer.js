import multer from "multer";
import generateuniquestring from "../utils/generate-unique-str.js";
import { allowedExtensions } from "../utils/allowed-extensions.js";

export const multerhost=({extensions = allowedExtensions.image})=>{

    const storage=multer.diskStorage({
        filename:(req,file,cb)=>{
            const uniquestr=generateuniquestring(4) + '_'+file.originalname
            cb(null,uniquestr)
        }
    })

    const filefilter=(req,file,cb)=>{
        if (extensions.includes(file.mimetype.split('/')[1])) {
            return cb(null, true)
        }
        cb(new Error('Image format is not allowed!'), false)
    

    }

    const file=multer({filefilter,storage})
    return file
}