import type {ReadStream} from 'fs'
import type {Model as ModelSqz, ModelStatic} from 'sequelize'

export type Data = {[header: string]: ReadStream | string}

export type Action = {
  method: string
  path: string
  tag: string
  header: string
  params: {[key: string]: string}
  queries: {[key: string]: string}
  data: Data | null
}

export type LambdaResult = {
  statusCode: number
  headers: {[header: string]: string | number | boolean}
  body: string
  data: any
}

export type Model = ModelStatic<ModelSqz<any, any>>

export type Models = {[key: string]: Model}
