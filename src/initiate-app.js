import expressAsyncHandler from "express-async-handler"
import dbconnect from "../db/dbconnections.js"
import { globalResponse } from "./middlewares/error-handling.middleware.js"
import { rollbacksaveddocuments } from "./middlewares/rollback-saved-documnets.middleware.js"
import { rollbackuploadfiles } from "./middlewares/rollback-uploaded-files.middleware.js"
import * as router from './modules/index.routes.js'
import { cronsschedule } from "./utils/crons.js"
import { gracefulShutdown } from "node-schedule"


export const initiateApp = (app, express) => {

    const port = process.env.PORT

    app.use(express.json())
    

    dbconnect()

    app.use('/user',router.userRouter)
    app.use('/artical',router.articalrouter)
    app.use('/sub-artical',router.subarticalrouter)
    app.use('/consultation',router.consultationrouter)
    app.use('/lawyer',router.lawyerRouters)
    app.use('/admin',router.adminRoutes)
    app.use('/consultation',router.consultationrouter)
    app.use('/payment',router.paymentrouter)

    app.use('*',(req,res,next)=>{
        res.status(404).json({message:"notfound"})
    })
    app.use(globalResponse,rollbacksaveddocuments,rollbackuploadfiles)
    cronsschedule()
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))


}