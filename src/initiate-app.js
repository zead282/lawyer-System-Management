import dbconnect from "../db/dbconnections.js"
import { globalResponse } from "./middlewares/error-handling.middleware.js"
import * as router from './modules/index.routes.js'




export const initiateApp = (app, express) => {

    const port = process.env.PORT

    app.use(express.json())
    

    dbconnect()

    app.use('/user',router.userRouter)
    app.use('/lawyer',router.lawyerRouters)

    app.use(globalResponse)
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))


}