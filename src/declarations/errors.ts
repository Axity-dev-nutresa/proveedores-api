import statusCodes from '@config/statusCodes'

/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: statusCodes
  constructor(status: statusCodes, message: string) {
    super(message)
    this.status = status
  }
}
