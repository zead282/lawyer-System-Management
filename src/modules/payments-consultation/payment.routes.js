
import { Router } from "express";
import { authorization ,authntiaction ,errorHandler } from "../../middlewares/middlewares-index.js";
import * as paymentcontroller from './payment.controller.js'

const router=Router()

router.post('/paymob/:consultationid',
    errorHandler(paymentcontroller.createpayment))

    .get('/get-all-payments',paymentcontroller.getAllPayments)
    .get('/webhook',paymentcontroller.webhook)
export default router