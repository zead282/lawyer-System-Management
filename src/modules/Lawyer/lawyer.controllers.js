import { UserQuestions } from "../../../db/collections/collections.index.js"
import sendemailservices from "../../services/send-email.service.js"
import { emailTemplete } from "../../utils/email-templete.js"
import { userQuestionStatus } from "../../utils/utils.index.js"


export const getAllUsersQuestions = async (req, res,next) => {
    const UsersQuestions = await UserQuestions.find()
if (!UsersQuestions.length) return res.status(404).json({message:"No Questions Found"}) 
    res.status(200).json(UsersQuestions)
}


export const answerUserQuestion = async (req, res,next) => {
    const {questionId,answer}=req.body

    const userQuestion = await UserQuestions.findById(questionId)
    if(!userQuestion) return next(new ErrorClass("question not found", 404))
    
    // send email 
   const sendEmail = await sendemailservices({
        to:userQuestion.email,
        subject:"Lawyer System Management",
        message:emailTemplete({
            title:"Lawyer System Management",
            userName:userQuestion.firstName + " " + userQuestion.lastName,
            userQuestion:userQuestion.legalInquiry,
            answer:answer})
    })
    if(!sendEmail) return next(new ErrorClass("failed to send email", 500))
    // change status
    userQuestion.status = userQuestionStatus.Answered
    await  userQuestion.save()
    res.status(200).json({message:"email sent successfully"})

}