import { Router } from "express";
import { authntiaction } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authoeization.js";
import { articalendpoints } from "./artical.endpoints.js";
import * as articalcontroller from './artical.controller.js'
import { multerhost } from "../../middlewares/multer.js";
import expressAsyncHandler from "express-async-handler";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
const router=Router()

//add artical
router.post('/add',authntiaction(),authorization(articalendpoints.owner),
multerhost({extensions:allowedExtensions.image}).single('image'),
expressAsyncHandler(articalcontroller.addartical))

////update artical----owner only
router.put('/update/:articalid',authntiaction(),authorization(articalendpoints.owner),
multerhost({extensions:allowedExtensions.image}).single('image'),
expressAsyncHandler(articalcontroller.update_artical))


////delete artical----owner only
router.delete('/delete/:articalid',authntiaction(),authorization(articalendpoints.owner),expressAsyncHandler(articalcontroller.delete_artical))

///get all articals with pagination
router.get('/articals',expressAsyncHandler(articalcontroller.getall_articals))
export default router