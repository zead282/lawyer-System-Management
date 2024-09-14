import { Router } from "express";
import * as userControllers from "./user.controller.js"
import { errorHandler, validationmiddleware } from "../../middlewares/middlewares-index.js";
import { askLawyerSchema, logInSchema, signUpShema } from "./user.validation.js";
import expressAsyncHandler from "express-async-handler";

const userRouter=Router();

userRouter
// ============================= Sign Up =========================
.post("/signup",
    validationmiddleware(signUpShema),
    errorHandler(userControllers.signUpWithSystem)
)
// ============================ Log In ============================
.post("/login",
    validationmiddleware(logInSchema),
    errorHandler(userControllers.logIn)
)
// ============================ verfiy email ============================
.get('/verify-email',expressAsyncHandler(userControllers.verfiyemail))
// ============================ ask a lawyer ============================
.post('/ask-a-lawyer',
    validationmiddleware(askLawyerSchema),
    errorHandler(userControllers.askLawyer))
export default userRouter;