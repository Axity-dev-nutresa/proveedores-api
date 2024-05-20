import type {ModelStatic, Model as ModelSqz} from 'sequelize'

export type LambdaConfig = {
  method: string
  path: string
  modelName: string
  params: {[key: string]: string}
  querys: {[key: string]: string}
  headers: {[header: string]: string}
  body: any
}

export type LambdaResult = {
  statusCode: number
  headers: {[header: string]: string | number | boolean}
  body: string
  data: any
}

export type Model = ModelStatic<ModelSqz<any, any>>

export type Models = {[key: string]: Model}
