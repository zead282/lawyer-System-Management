import Joi from "joi";

export const signUpShema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(10).required(), 
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(40).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
})

export const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.required()
})