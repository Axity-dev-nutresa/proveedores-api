import db from '@db'
import api from '@src/api/routes'
import server from '@src/server'
import type {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import serverless from 'serverless-http'

const getResponseError = (error: any) => {
  return {
    isBase64Encoded: false,
    statusCode: 500,
    body: JSON.stringify({message: error.toString()}),
    headers: {'content-type': 'application/json'}
  }
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    await db.open()
    server.use('/api', api)
    if (!event) throw Error('"event" does not have a valid value')
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    console.error(error)
    return getResponseError(error)
  } finally {
    await db.close()
  }
}
