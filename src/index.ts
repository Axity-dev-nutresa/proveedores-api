import envVars from '@config/envVars'
import db from '@db'
import api from '@src/api/routes'
import serviceRoutes from '@src/services/routes'
import swaggerJson from '@src/swagger.json'
import {upload} from '@src/utils/multer'
import swaggerUi from 'swagger-ui-express'
import server from '@src/server'

server.use('/api', api)
server.use('/service', upload.single('file'), serviceRoutes)
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson))

db.open()
  .then(() => {
    return server.listen(envVars.port, () => {
      console.log('Server abierto en puerto: ', envVars.port)
    })
  })
  .catch((error) => console.error(error))
