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

export const saveSwagger = () => {
  fs.writeFileSync('./src/swagger.json', JSON.stringify(swaggerObject), 'utf8')
  fs.writeFileSync('./src/swagger.yml', yaml.dump(swaggerObject), 'utf8')
}

export const addModels = (models: ModelStatic<Model<any, any>>[], examples: any) => {
  return models.forEach((model) => {
    const schema = makeSchema(model, examples[model.name].new)
    swaggerObject.components.schemas[model.tableName] = schema
    swaggerObject.components.tags.push(model.name)
  })
}

export const addRoute = (action: LambdaConfig, res: LambdaResult) => {
  const {url, parameters} = getParameters(action)

  if (!swaggerObject.paths[url]) {
    swaggerObject.paths[url] = {}
  }

  swaggerObject.paths[url][action.method.toLowerCase()] = {
    tags: [action.modelName],
    parameters,
    requestBody: action.body
      ? {
          required: true,
          content: makeContent(res.data)
        }
      : null,
    responses: {}
  }
  swaggerObject.paths[url][action.method.toLowerCase()].responses[res.statusCode] = {
    content: makeContent(res.data)
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
