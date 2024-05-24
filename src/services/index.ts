import statusCodes from '@src/config/statusCodes'
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

// export const handler: APIGatewayProxyHandler = serverless(server) as any

const getResponseError = (error: any) => {
  return {
    isBase64Encoded: false,
    statusCode: statusCodes.INTERNAL_SERVER_ERROR,
    body: JSON.stringify({message: error.toString()}),
    headers: {'content-type': 'application/json'}
  }
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    if (!event) throw Error('"event" does not have a valid value')
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    console.error(error)
    return getResponseError(error)
  }
}
