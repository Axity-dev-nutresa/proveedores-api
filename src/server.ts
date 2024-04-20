import envVars from '@config/envVars'
import statusCodes from '@config/statusCodes'
import {NodeEnvs} from '@declarations/enums'
import {RouteError} from '@declarations/errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import type {NextFunction, Request, Response} from 'express'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'

const server = express()
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())

if (envVars.nodeEnv === NodeEnvs.dev) {
  server.use(morgan('dev'))
}

if (envVars.nodeEnv === NodeEnvs.prd) {
  server.use(helmet())
}

server.use(cors())

server.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let status = statusCodes.BAD_REQUEST
  if (error instanceof RouteError) {
    status = error.status
  }
  console.error(error)
  return res.status(status).json({message: error.message})
})

export default server
