import serverless from 'serverless-http'
import type {
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import server from './server'
import db from '@db'

const getResponseError = (error: any) => {
  console.error(error)
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
    if (!event) throw Error('"event" does not have a valid value')
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    return getResponseError(error)
  } finally {
    await db.close()
  }
}

export const seveFileS3: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    if (!event) throw Error('"event" does not have a valid value')
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    return getResponseError(error)
  }
}
