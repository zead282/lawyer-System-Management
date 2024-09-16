
import Joi from "joi";
import { generalRules } from "../../utils/general-rules.js";

export const deletesubartical_schema={

    params:Joi.object({
        articalid:generalRules.objectId.required()
    }),

}

export const addsubarticalschema={
    params:Joi.object({
        articalid:generalRules.objectId.required()
    }),

    body:Joi.object({
        title:Joi.string().required(),
        content:Joi.string().required()
    }),

    
}