import db from '@db'
import api from '@src/api/routes'
import {getResponseError} from '@src/declarations/functions'
import {trapErrors} from '@src/declarations/middlewares'
import server from '@src/server'
import type {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import serverless from 'serverless-http'

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
    return getResponseError(String(error))
  } finally {
    await db.close()
  }
}
