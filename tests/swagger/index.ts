import {ReadStream} from 'fs'
import fs from 'fs'
import yaml from 'js-yaml'
import {description, name, version} from 'package.json'
import type {Model, ModelStatic} from 'sequelize'
import type {Action, Data, LambdaResult} from '../types'
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
    description,
    version,
    title: name,
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
  const schema = makeSchema(model, example)
  swaggerObject.components.schemas[model.tableName] = schema
}

export const addRoute = (action: Action, res: LambdaResult) => {
  const {url, parameters} = getParameters(action)
  const method = action.method.toLowerCase()
  if (!swaggerObject.paths[url]) swaggerObject.paths[url] = {}
  const responses = swaggerObject.paths[url]?.[method]?.responses ?? {}
  responses[res.statusCode] = {content: makeContent(res.data)}
  const requestBody = swaggerObject.paths[url]?.[method]?.requestBody ?? {
    required: true,
    content: {}
  }
  requestBody.content[action.header] = makeBody(action.data)
  swaggerObject.paths[url][method] = {
    parameters,
    tags: [action.tag],
    requestBody,
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

const getParameters = (action: Action) => {
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

  const [url, parameters] = Object.entries(action.queries).reduce(
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

const mergeObjects = <T extends Record<string, any>>(obg1: T, obg2: T): T => {
  const result: T = {...obg1}
  for (const key in obg2) {
    if (Array.isArray(obg2[key]) || obg2[key] === null) result[key] = obg2[key]
    else if (typeof obg2[key] === 'object') {
      if (typeof obg1?.[key] === 'object') {
        result[key] = mergeObjects(obg1[key], obg2[key])
      } else result[key] = obg2[key]
    } else result[key] = obg2[key]
  }
  return result
}

export const saveSwagger = () => {
  const swaggerStr = fs.readFileSync('./src/swagger.json', 'utf8')
  const newSwagger = mergeObjects(JSON.parse(swaggerStr), swaggerObject)
  fs.writeFileSync('./src/swagger.json', JSON.stringify(newSwagger), 'utf8')
  fs.writeFileSync('./src/swagger.yml', yaml.dump(newSwagger), 'utf8')
}

const makeBody = (data: Data | null) => {
  if (!data) return null
  return {
    schema: {
      type: 'object',
      properties: Object.entries(data).reduce((props, [key, value]) => {
        if (value === null) props[key] = null
        else if (value instanceof ReadStream) {
          props[key] = {
            type: 'string',
            format: 'binary',
            example: null
          }
        } else if (Array.isArray(value)) {
          props[key] = {
            type: 'array',
            example: value
          }
        } else {
          props[key] = {
            type: typeof value,
            example: value
          }
        }
        return props
      }, {} as any)
    }
  }
}

// "parameters": [],
// "tags": ["FileS3"],
// "requestBody": {
//   "required": true,
//   "content": {
//     "multipart/form-data": {
//       "schema": {
//         "type": "object",
//         "properties": {
//           "filePath": {
//             "type": "string",
//             "description": "Descripción del archivo"
//           },
//           "file": {
//             "type": "string",
//             "format": "binary",
//             "description": "El archivo a subir"
//           }
//         },
//         "example": {
//           "filePath": "Este es un ejemplo de descripción",
//           "file": null
//         }
//       }
//     }
//   }
// },
