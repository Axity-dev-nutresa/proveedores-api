import envVars from '@config/envVars'
import {NodeEnvs} from '@declarations/enums'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const server = express()
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())
server.use(cors())

if (envVars.nodeEnv !== NodeEnvs.prod) {
  server.use(morgan('dev'))
}

if (envVars.nodeEnv !== NodeEnvs.dev) {
  server.use(helmet())
}

export default server
