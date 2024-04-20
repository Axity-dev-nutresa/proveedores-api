import server from '@src/server'
import serviceRoutes from '@src/services/routes'
import {upload} from '@src/utils/multer'
import serverless from 'serverless-http'

server.use('/service', upload.single('file'), serviceRoutes)

export const handler = serverless(server)
