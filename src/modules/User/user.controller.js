import bcryptjs from "bcryptjs"
import { User } from "../../../db/collections/collections.index.js"
import ErrorClass from "../../utils/Error-class.js"

// =================================== Sign Up ================================
export const signUpWithSystem = async (req,res,next) => {
    /**
     * name - email - phone - password
     */
    const {name,email,phone,password} = req.body
    // check if user exist
    const isUserExist = await User.findOne({email})
    if(isUserExist) return next(new ErrorClass("user already exist", 400))
    
    // hash password
    const hashPassword = bcryptjs.hashSync(password, 10)
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

    res.status(200).json({message: "Logged in Succsessfully", user})
}
