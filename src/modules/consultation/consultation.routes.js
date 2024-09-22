import { Router } from "express";
import { authntiaction } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authoeization.js";
import * as consultationcontroller from './consultation.controller.js'
import {consultendpoints} from './consultation.endpoints.js'
import expressAsyncHandler from "express-async-handler";
const router=Router()

//add
router.post('/add',authntiaction(),authorization(consultendpoints.owner),expressAsyncHandler(consultationcontroller.addconsultation))

//delete
router.delete('/delete/:consid',authntiaction(),authorization(consultendpoints.owner),expressAsyncHandler(consultationcontroller.deleteConsultation))

//get
router.get('/get',expressAsyncHandler(consultationcontroller.getconsultations))

//update
router.put('/update/:consid',authntiaction(),authorization(consultendpoints.owner),expressAsyncHandler(consultationcontroller.updateConsulattion))




export default router