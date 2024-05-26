import statusCodes from '@config/statusCodes'
import 'express-async-errors'

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
    super(statusCodes.BAD_REQUEST, `No record found for primaryKey: ${id}`)
  }
}

/**
 * Error with status code and message
 */
export class ModelNotFund extends RouteError {
  constructor(modelName: string) {
    super(statusCodes.NOT_FOUND, `Model '${modelName}' not found.`)
  }
}

/**
 * Error with status code and message
 */
export class PropertyInvalid extends RouteError {
  constructor(modelName: string) {
    super(statusCodes.BAD_REQUEST, `Invalid value for '${modelName}' property `)
  }
}
