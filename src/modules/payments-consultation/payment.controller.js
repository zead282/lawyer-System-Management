import payments from "../../../db/collections/payments.js";
import consultation from "../../../db/collections/consultation.js";
import { authenticate,createOrder,generatePaymentKey } from "../../payment-handler/payment.js";

export const createpayment=async (req,res,next)=>{

    const{consultationid}=req.params
    const{name,email,phonenumber}=req.body

    ///check on consultation
    const consultationn=await consultation.findById(consultationid)
    if(!consultationn) return next(Error("consultation not found",404))

        
            // 1. Authenticate to get access token
            const price = consultationn.price *10
            const userdata={name,email,phonenumber}

            const token = await authenticate();
        
            // 2. Create an order
            const orderId = await createOrder(token, price); // amount in cents (e.g., 10000 = 100.00 EGP)
        
            // 3. Generate a payment key
            const paymentKey = await generatePaymentKey(token, orderId, userdata,price);
           
            // You can now send the payment key to the frontend to use with Paymob's payment gateway    
            const checkOutSessionLink = `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.iframsId}?payment_token=${paymentKey}`;

          res.status(200).json({checkOutSession:checkOutSessionLink})
          
}