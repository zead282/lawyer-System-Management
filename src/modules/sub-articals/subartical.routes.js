import { Router } from "express";
import { authntiaction } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authoeization.js";
import { subarticalendpoints } from "./sub-artical.endpoints.js";
import { multerhost } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import expressAsyncHandler from "express-async-handler";
import * as subcontroller from './/subartical.controller.js'
import { validationmiddleware } from "../../middlewares/validation.middleware.js";
import * as subvalidation from './sub-artical.schema.js'
const router=Router()

///add sub-artical by owner only
router.post('/add/:articalid',authntiaction(),
authorization(subarticalendpoints.owner),
multerhost(allowedExtensions.image).single('image'),
validationmiddleware(subvalidation.addsubarticalschema),
expressAsyncHandler(subcontroller.add_sub_artical))

////get specific sub-artical by all users
router.get('/sp-artical/:articalid',expressAsyncHandler(subcontroller.sp_sub_artical))

///delete sub-artical owner only
router.delete('/delete/:articalid',authntiaction(),
authorization(subarticalendpoints.owner),
validationmiddleware(subvalidation.deletesubartical_schema),
expressAsyncHandler(subcontroller.delete_sub_artical))

////update sub-artical owner only
router.put('/update/:articalid',authntiaction(),
authorization(subarticalendpoints.owner),
multerhost(allowedExtensions.image).single('image'),
expressAsyncHandler(subcontroller.update_sub_artical))

export default router