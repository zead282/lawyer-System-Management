
import { Router } from "express";
import { authntiaction } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authoeization.js";
import expressAsyncHandler from "express-async-handler";
import * as paymentcontroller from './payment.controller.js'

const router=Router()

router.post('/paymob/:consultationid',authntiaction(),expressAsyncHandler(paymentcontroller.createpayment))


export default router