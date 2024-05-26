import statusCodes from '@src/config/statusCodes'

export const getResponseError = (message: string) => {
  return {
    isBase64Encoded: false,
    statusCode: statusCodes.INTERNAL_SERVER_ERROR,
    body: JSON.stringify({message}),
    headers: {'content-type': 'application/json'}
  }
}
