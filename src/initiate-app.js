import dbconnect from "../db/dbconnections.js"
import * as router from './modules/index.routes.js'
import { globalResponse } from "./middlewares/global-response.middleware.js"



export const initiateApp = (app, express) => {

    const port = process.env.PORT

    app.use(express.json())
    app.use(globalResponse)

    dbconnect()

    app.use('/user',router.userrouter)


    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))


}