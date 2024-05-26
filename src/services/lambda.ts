import {getResponseError} from '@src/declarations/functions'
import {trapErrors} from '@src/declarations/middlewares'
import server from '@src/server'
import serviceRoutes from '@src/services/routes'
import {upload} from '@src/utils/multer'
import type {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import serverless from 'serverless-http'

server.use('/service', upload.single('file'), serviceRoutes)
server.use(trapErrors)

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    if (!event) throw Error('"event" does not have a valid value')
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    console.error(error)
    return getResponseError(String(error))
  }
}
