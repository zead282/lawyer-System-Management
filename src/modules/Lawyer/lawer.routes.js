import { Router } from "express";
import * as lawyerControllers from "./lawyer.controllers.js"
import { authntiaction, authorization, errorHandler } from "../../middlewares/middlewares-index.js";
import { endpoints } from "./lawyer.endpoints.js";

const lawyerRouters = Router();

lawyerRouters
.get("/get-all-questions",
    authntiaction(),
   authorization(endpoints.userRole),
    errorHandler(lawyerControllers.getAllUsersQuestions)
)
// ============================= answer a question ============================
.post("/answer-a-question",
    authntiaction(),
    authorization(endpoints.userRole),
    errorHandler(lawyerControllers.answerUserQuestion)
)


export default lawyerRouters