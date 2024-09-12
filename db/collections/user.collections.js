import { Schema,model, Types } from "mongoose";
import { userRole, userSignUpWith } from "../../utils/utils.index.js";
/**
 * User Model
 *  - name
    - email
    - phone
    - password ⇒ if user signup with google email (write a dummy password )
    - userRole ⇒ [  user , lower , admin, owner]
        - user ⇒ Book a legal consultation , ask lower
        - lower ⇒ Respond to the user via email and collaborate with him to address his questions
        - admin ⇒ enter an article and new lower (mange articles and lowers data)
        - owner ⇒ see all that happened at the system
 */
const userSchema = new Schema({
    name:{
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
    password:{
        type: String,
        required: true
    },
    userRole:{
        type: String,
        enum : Object.values(userRole),
        required: true
    },
    signUpWith :{
        type: String,
        required: true,
        default: userSignUpWith.system
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    versionKey: false
})

export const User = model("User",userSchema)