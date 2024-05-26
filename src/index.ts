import envVars from '@config/envVars'
import db from '@db'
import apiRoutes from '@src/api/routes'
import {trapErrors} from '@src/declarations/middlewares'
import app from '@src/server'
import serviceRoutes from '@src/services/routes'
import swaggerJson from '@src/swagger.json'
import {upload} from '@src/utils/multer'
import swaggerUi from 'swagger-ui-express'

app.use('/api', apiRoutes)
app.use('/service', upload.single('file'), serviceRoutes)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use(trapErrors)

export const server = db
  .open()
  .then(() => {
    return app.listen(envVars.port, () => {
      console.log('Server listening on port: ', envVars.port)
    })
  })
  .catch(console.error)

export default app
