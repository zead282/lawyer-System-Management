import { Router } from "express";
import { authntiaction, authorization, errorHandler, multerhost } from "../../middlewares/middlewares-index.js";
import { allowedExtensions, userRole } from "../../utils/utils.index.js";
import * as adminControllers from "./admin.controllers.js"


const adminRoutes = Router();

adminRoutes
.post("/add-lawyer",
    authntiaction(),
    authorization(userRole.admin),
    multerhost({extensions:allowedExtensions.image}).single('image'),
    errorHandler(adminControllers.addLawyer)
)
.get("/get-all-lawyers",
    authntiaction(),
    authorization(userRole.admin),
    errorHandler(adminControllers.getAllLawyers)
)
.get("/get-specific-lawyer/:id",
    authntiaction(),
    authorization(userRole.admin),
    errorHandler(adminControllers.getSpecificLawyer)
)
.delete("/delete-lawyer/:id",
    authntiaction(),
    authorization(userRole.admin),
    errorHandler(adminControllers.deleteLawyer)
)
.put("/update-lawyer/:id",
    authntiaction(),
    authorization(userRole.admin),
    multerhost({extensions:allowedExtensions.image}).single('image'),
    errorHandler(adminControllers.updateLawyer))

export default adminRoutes 