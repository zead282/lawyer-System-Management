
import { Router } from "express";
import { authntiaction } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authoeization.js";
import {errorHandler} from "../../middlewares/middlewares-index.js";
import * as paymentcontroller from './payment.controller.js'

const router=Router()

router.post('/paymob/:consultationid',
    errorHandler(paymentcontroller.createpayment))


export default router