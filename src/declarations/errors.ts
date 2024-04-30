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

/**
 * Error with status code and message
 */
export class PkNotMach extends RouteError {
  constructor(id: string) {
    super(statusCodes.BAD_REQUEST, `No se encontro registro para la pk: ${id}`)
  }
}
