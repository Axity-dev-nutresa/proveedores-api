import fs from 'fs'
import yaml from 'js-yaml'
import {description, name, version} from 'package.json'
import type {Model, ModelStatic} from 'sequelize'
import type {LambdaConfig, LambdaResult} from '../types'
import {makeSchema} from './makeSchema'

export type Models = {[key: string]: ModelStatic<Model<any, any>>}

export interface Parameters {
  name: string
  in: string
  type: string
  required: boolean
}

const swaggerObject: any = {
  openapi: '3.0.0',
  info: {
    title: name,
    description,
    version,
    servers: [`http://localhost:4000`]
  },
  paths: {},
  components: {
    parameters: {},
    definitions: {},
    schemas: {},
    tags: []
  }
}

export const addModel = (model: ModelStatic<Model<any, any>>, example: any) => {
  const schema = makeSchema(model, example.new)
  swaggerObject.components.schemas[model.tableName] = schema
  swaggerObject.components.tags.push(model.name)
}

export const addRoute = (action: LambdaConfig, res: LambdaResult) => {
  const {url, parameters} = getParameters(action)
  const method = action.method.toLowerCase()
  if (!swaggerObject.paths[url]) swaggerObject.paths[url] = {}
  const responses = swaggerObject.paths[url]?.[method]?.responses ?? {}
  responses[res.statusCode] = {content: makeContent(res.data)}
  swaggerObject.paths[url][method] = {
    tags: [action.modelName],
    parameters,
    requestBody: action.body ? {required: true, content: makeContent(action.body)} : null,
    responses
  }
}

const makeContent = (data: any) => {
  return {
    'application/json': {
      schema: {
        type: Array.isArray(data) ? 'array' : typeof data,
        example: data
      }
    }
  }
}

const getParameters = (action: LambdaConfig) => {
  const [baseUrl, params] = Object.entries(action.params).reduce(
    ([path, parameter], [key, value]) => {
      path = path.replace(`:${key}`, `{${key}}`)
      parameter.push({
        name: key,
        in: 'path',
        type: typeof value,
        required: true
      })
      return [path, parameter]
    },
    [action.path, [] as Parameters[]]
  )

  const [url, parameters] = Object.entries(action.querys).reduce(
    ([path, parameter], [key, value]) => {
      path += `${!path.includes('?') ? '?' : '&'}${key}={${key}}`
      parameter.push({
        name: key,
        in: 'path',
        type: typeof value,
        required: false
      })
      return [path, parameter]
    },
    [baseUrl, params]
  )
  return {url, parameters}
}

export const saveSwagger = () => {
  fs.writeFileSync('./src/swagger.json', JSON.stringify(swaggerObject), 'utf8')
  fs.writeFileSync('./src/swagger.yml', yaml.dump(swaggerObject), 'utf8')
}
