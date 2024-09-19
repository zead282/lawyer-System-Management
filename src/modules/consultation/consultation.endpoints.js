import { userRole } from "../../utils/enums.utils.js";


export const consultendpoints={
    owner:[userRole.owner],
    getal_consultation:[userRole.admin,userRole.lower,userRole.owner,userRole.user]
}