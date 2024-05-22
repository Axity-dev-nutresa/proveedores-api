import db from '@db'
import api from '@src/api/routes'
import statusCodes from '@src/config/statusCodes'
import {trapErrors} from '@src/declarations/middlewares'
import server from '@src/server'
import type {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import 'express-async-errors'
import serverless from 'serverless-http'

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
    await db.open()
    server.use('/api', api)
    server.use(trapErrors)
    return (await serverless(server)(event, context)) as APIGatewayProxyResult
  } catch (error) {
    console.error(error)
    return getResponseError(error)
  } finally {
    await db.close()
  }
}
