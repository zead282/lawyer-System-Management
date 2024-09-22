import { userRole } from "../../utils/enums.utils.js";


export const consultendpoints={
    owner:[userRole.owner],
    getal_consultation:[userRole.admin,userRole.lawyer,userRole.owner,userRole.user]
}