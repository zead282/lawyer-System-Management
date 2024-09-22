import { authenticate,createOrder,generatePaymentKey, getTransactionsFromPaymob } from "../../payment-handler/payment.js";
import ErrorClass from "../../utils/Error-class.js";
import { User ,Consultation,Payment } from "../../../db/collections/collections.index.js";
import { paymentStatus } from "../../utils/utils.index.js";

export const createpayment=async (req,res,next)=>{ 

    const{consultationid}=req.params
    const{name,email,phonenumber}=req.body

    ///check on consultation
    const consultationn=await Consultation.findById(consultationid)
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
          // save in db 
          const payment=await Payment.create({name,phonenumber,email,orderid:orderId})
        
          res.status(200).json({checkOutSession:checkOutSessionLink})
          
}



export const getAllPayments=async (req,res,next)=>{
  const token = await authenticate();
  const transactions = await getTransactionsFromPaymob(token);


  res.status(200).json({transactions})
}


// export const webhook = (req, res, next) => {
//   const data = req.query
//   console.log(data);
  
//   res.status(200).json({message:"Webhook received",data});
// };

export const webhook=async(req,res,next)=>{
  try {
    // Log the raw body and headers to inspect what you're receiving
    //console.log('quey:', req.query); // This is already parsed as an object if express.json() is used

    // If req.body is empty, handle it
    if (!req.query || Object.keys(req.query).length === 0) {
      next(new ErrorClass('Received an empty webhook payload.', 400,'No data received'));
    }

    // Extract data from the body (if it's a POST with JSON payload)
    const {  success, order, txn_response_code} = req.query;

    // Check if the transaction was successful
    if ((success === true || success === 'true') && txn_response_code=='APPROVED') {
      // update payment status
      const updatePaymentData=await Payment.findOneAndUpdate({orderid:order},{
        paymentStatus:paymentStatus.success},{new:true});
      res.status(200).json({ message: 'paid' }); 
    } else {
      res.status(400).json({ message: 'unpaid' });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ message: 'Internal server error', error_msg: error.message });
  }
};