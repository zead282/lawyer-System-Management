import bcryptjs from "bcryptjs"
import { User, UserQuestions } from "../../../db/collections/collections.index.js"
import ErrorClass from "../../utils/Error-class.js"
import sendemailservices from "../../services/send-email.service.js"
import jwt from 'jsonwebtoken'
// =================================== Sign Up ================================
export const signUpWithSystem = async (req,res,next) => {
    /**
     * name - email - phone - password
     */
    const {name,email,phone,password} = req.body
    // check if user exist
    const isUserExist = await User.findOne({email})
    if(isUserExist) return next(new ErrorClass("user already exist", 400))

    ///email verfiy
    const usertoken=jwt.sign({email},process.env.JWT_VERFICATION,{ expiresIn: '3m'})
    
    const isemailsent=await sendemailservices({
        to:email,
        subject:"click to verfiy email",
        message:`<h1>Please click on the link to verify your email</h1>
        <a href="http://localhost:3000/user/verify-email?token=${usertoken}">>verfication</a>`
        
    })    
    if(!isemailsent) return next(new Error("email sent ,please try later",{cause:500}))    
   
    
    // hash password
    const hashPassword = bcryptjs.hashSync(password,+process.env.SALT_ROUNDS)
    // create new user
    const newUser = new User({
        name,
        email,
        phone,
        password: hashPassword
    })
    await newUser.save()
    res.status(200).json({message: "user created successfully"})
}

// ============================ log in ==========================
export const logIn = async (req,res,next)=>{
    // destruct data 
    const {email,password} = req.body
    // check if user exist
    const user = await User.findOne({email})
    if(!user) return next(new ErrorClass("Email or Password is not correct ", 404))
    
    // if user found check password
    const isPasswordMatch = bcryptjs.compareSync(password, user.password) 
    if(!isPasswordMatch) return next(new ErrorClass("Email or Password is not correct ", 400))

     //generate token
     const token=jwt.sign({_id:user._id,email:user.email},process.env.JWT_LOGIN_SIGNATURE,{expiresIn:'1d'})   

    res.status(200).json({message: "Logged in Succsessfully",token})
}

//////verfiy email/// 

export const verfiyemail = async (req,res,next)=>{

    const{token}=req.query;

    const decoded=jwt.verify(token,process.env.JWT_VERFICATION)
    
    const finduser=await User.findOneAndUpdate({email:decoded.email,isEmailVerified:false},{isEmailVerified:true},{new:true})
    if(!finduser) return next(new Error("user not found",{cause:404}))
    res.status(200).json({
            success: true,
            message: 'Email verified successfully, please try to login'
        })

}



/**
 * @AhmedElmahhdy 
 * @api /ask-lawyer 
 * take data from user and save it at ask-lawyer collection at db
 * 
 * 
 *
 */
export const askLawyer = async (req,res,next)=>{
    const {firstName,lastName,email,phone,title,legalInquiry}=req.body

    const newQuestion = new UserQuestions({
        firstName,
        lastName,
        email,
        phone,
        title,
        legalInquiry
    })
    await newQuestion.save()
    res.status(200).json({message: "question added successfully"})

}