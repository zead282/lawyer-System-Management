import { userRole } from "../../utils/enums.utils.js";

export const endpoints={
    userRole:Object.values(userRole).filter(
        (role) => role == "admin" || role == "owner" || role == "lawyer"
    ),   
}