import statusCodes from '@config/statusCodes'
import {RouteError} from '@declarations/errors'
import {getModels} from '@src/database'
import type {NextFunction, Request, Response} from 'express'
import 'express-async-errors'

export const trapErrors = (
  error: Error | RouteError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error)
  return res
    .status(error instanceof RouteError ? error.status : statusCodes.BAD_REQUEST)
    .json({message: error.message})
}

export const validateModel = (req: Request, res: Response, next: NextFunction) => {
  const {modelName} = req.params
  const names = Object.keys(getModels())
  if (names.includes(modelName)) return next()
  return res.status(statusCodes.NOT_FOUND).json({
    status: statusCodes.NOT_FOUND,
    message: `No se encontro el modelo '${modelName}'`
  })
}
