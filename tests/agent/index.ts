import {addRoute} from '../swagger'
import type {Action, LambdaResult} from '../types'
import type {APIGatewayProxyHandler} from 'aws-lambda'
import {getBodyAndHeaders} from './makeBody'

let lambda = <APIGatewayProxyHandler | null>null

const spy = async (action: Action): Promise<LambdaResult> => {
  const {data, header, params, queries, path, method} = action
  const {isBase64Encoded, headers, body} = await getBodyAndHeaders(data, header)
  if (!lambda) throw Error('An agent has not been called')
  const url = Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path
  )

  const queryString = Object.entries(queries).reduce(
    (acc, [key, value]) => `${acc}${!acc ? '' : '&'}${key}=${value}`,
    ''
  )

  const res = await lambda(
    {
      headers,
      body,
      isBase64Encoded,
      cookies: [],
      pathParameters: {default: url},
      queryStringParameters: queries,
      rawPath: url,
      rawQueryString: queryString,
      routeKey: '$default',
      stageVariables: null,
      version: '2.0',
      multiValueHeaders: {},
      httpMethod: method,
      path: url,
      multiValueQueryStringParameters: queryString,
      resource: '',
      requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        authorizer: {lambda: {}},
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        requestId: 'offlineContext_resourceId',
        routeKey: '$default',
        stage: '$default',
        httpMethod: method,
        protocol: 'http',
        path: url,
        resourcePath: url,
        requestTimeEpoch: 1,
        resourceId: '',
        operationName: undefined,
        time: Date.now().toLocaleString(),
        timeEpoch: Date.now(),
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: '',
          user: null,
          userAgent: null,
          userArn: null
        },
        http: {
          method,
          path: url,
          protocol: 'HTTP/1.1',
          sourceIp: '::1',
          userAgent: 'PostmanRuntime/7.36.1'
        }
      }
    } as any,
    {
      callbackWaitsForEmptyEventLoop: false,
      functionName: '',
      functionVersion: '',
      invokedFunctionArn: '',
      memoryLimitInMB: '',
      awsRequestId: '',
      logGroupName: '',
      logStreamName: '',
      getRemainingTimeInMillis(): number {
        throw new Error('Function not implemented. getRemainingTimeInMillis')
      },
      done(): void {
        throw new Error('Function not implemented. done')
      },
      fail(): void {
        throw new Error('Function not implemented. fail')
      },
      succeed(): void {
        throw new Error('Function not implemented. succeed')
      }
    },
    function (): void {
      throw new Error('Function not implemented.')
    }
  )

  if (!res) {
    return {
      statusCode: 500,
      data: {message: 'Error executing lambda'},
      body: '{"message":"Error executing lambda"}',
      headers: {}
    }
  }

  const response = {
    statusCode: res.statusCode,
    body: res?.body,
    data: await JSON.parse(res?.body),
    headers: res.headers ?? {}
  }
  addRoute(action, response)
  return response
}

export const agent = (handler: APIGatewayProxyHandler) => {
  if (!lambda) lambda = handler
  return spy
}

export default agent
