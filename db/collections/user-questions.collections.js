import { Schema, model, Types, Mongoose } from "mongoose";
import { userQuestionStatus } from "../../src/utils/utils.index.js";

/**
 * User Questions Model
 *    - First Name 
 *    - Last Name
 *    - Email
 *    - Phone 
 *    - Title
 *    - Legal Inquiry
 *    - Status
 */

const userQuestionsSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    legalInquiry:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: Object.values(userQuestionStatus),
        default:userQuestionStatus.Pending
    }
},{
    timestamps: true,
    versionKey: false
})


export const UserQuestions =   model("UserQuestions",userQuestionsSchema)