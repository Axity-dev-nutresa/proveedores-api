import envVars from '@config/envVars'
import db from '@db'
import apiRoutes from '@src/api/routes'
import {trapErrors} from '@src/declarations/middlewares'
import server from '@src/server'
import serviceRoutes from '@src/services/routes'
import swaggerJson from '@src/swagger.json'
import {upload} from '@src/utils/multer'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

server.use('/api', apiRoutes)
server.use('/service', upload.single('file'), serviceRoutes)
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson))
server.use(trapErrors)

db.open()
  .then(() => {
    return server.listen(envVars.port, () => {
      console.log('Server listening on port: ', envVars.port)
    })
  })
  .catch((error) => console.error(error))
