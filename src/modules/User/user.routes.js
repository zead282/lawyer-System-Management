import { Router } from "express";
import * as userControllers from "./user.controller.js"
import { errorHandler, validationmiddleware } from "../../middlewares/middlewares-index.js";
import { logInSchema, signUpShema } from "./user.validation.js";

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

export default userRouter;