import envVars from '@config/envVars'
import statusCodes from '@config/statusCodes'
import db from '@db'
import {RouteError} from '@declarations/errors'
import apiRoutes from '@src/api/routes'
import server from '@src/server'
import serviceRoutes from '@src/services/routes'
import swaggerJson from '@src/swagger.json'
import {upload} from '@src/utils/multer'
import type {NextFunction, Request, Response} from 'express'
import swaggerUi from 'swagger-ui-express'

server.use('/api', apiRoutes)
server.use('/service', upload.single('file'), serviceRoutes)
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson))

server.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let status = statusCodes.BAD_REQUEST
  if (error instanceof RouteError) {
    status = error.status
  }
  console.error(error)
  return res.status(status).json({message: error.message})
})

db.open()
  .then(() => {
    return server.listen(envVars.port, () => {
      console.log('Server listening on port: ', envVars.port)
    })
  })
  .catch((error) => console.error(error))
