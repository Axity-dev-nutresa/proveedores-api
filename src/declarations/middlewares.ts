import statusCodes from '@config/statusCodes'
import {ModelNotFund, RouteError} from '@declarations/errors'
import {getModels} from '@src/database'
import type {NextFunction, Request, Response} from 'express'

export const trapErrors = (
  error: Error | RouteError | any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error(error)
  const message = error.parent ? String(error.parent) : String(error)
  return res
    .status(error instanceof RouteError ? error.status : statusCodes.BAD_REQUEST)
    .json({message})
}

export const validateModel = (req: Request, _res: Response, next: NextFunction) => {
  const {modelName} = req.params
  const names = Object.keys(getModels())
  if (names.includes(modelName)) return next()
  else throw new ModelNotFund(modelName)
}
