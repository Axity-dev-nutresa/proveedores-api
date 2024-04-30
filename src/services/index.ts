import {trapErrors} from '@src/declarations/middlewares'
import server from '@src/server'
import serviceRoutes from '@src/services/routes'
import {upload} from '@src/utils/multer'
import serverless from 'serverless-http'

server.use('/service', upload.single('file'), serviceRoutes)
server.use(trapErrors)

export const handler = serverless(server)
