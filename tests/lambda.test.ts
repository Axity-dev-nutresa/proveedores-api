import fs from 'fs'
import {handler} from '@src/api/'
import {makeExamples, getExample} from './examples'
import agent from './agent'
import {addModels, saveSwagger} from './swagger'
import db from '@db'
import statusCodes from '@config/statusCodes'

const PATH_MODELS = './src/database/models'
const PATH_EXP = './tests/examples/examples.json'
const CONTENT_TYPE = 'content-type'
const filesModel = fs.readdirSync(PATH_MODELS)
const lambda = agent(handler)
let examples: any = {}

const testModel = (modelName: string) => {
  describe(`Routes for model ${modelName}`, () => {
    test(`GET: '/api/${modelName}'`, async () => {
      const config = {
        method: 'GET',
        path: `/api/${modelName}`,
        modelName,
        params: {},
        querys: {},
        headers: {},
        body: null
      }
      const {statusCode, headers, data} = await lambda(config)
      expect(statusCode).toBe(statusCodes.OK)
      expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(examples[modelName].list.length)
    })

    if (['Employee', 'Supplier'].includes(modelName)) {
      test(`POST: '/api/${modelName}'`, async () => {
        const newElement = examples[modelName].new
        const config = {
          method: 'POST',
          path: `/api/${modelName}`,
          modelName,
          params: {},
          querys: {},
          headers: {[CONTENT_TYPE]: 'application/json; charset=utf-8'},
          body: newElement
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        Object.keys(newElement).forEach((key) => {
          expect(data?.[key]).toEqual(newElement[key])
        })
      })

      test(`PUT: '/api/${modelName}/:uuid'`, async () => {
        const editElement = examples[modelName].edit
        const config = {
          method: 'PUT',
          path: `/api/${modelName}/:uuid`,
          modelName,
          params: {uuid: editElement.uuid},
          querys: {},
          headers: {[CONTENT_TYPE]: 'application/json; charset=utf-8'},
          body: editElement
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        Object.keys(editElement).forEach((key) => {
          expect(data?.[key]).toEqual(editElement[key])
        })
      })

      test(`GET: '/api/${modelName}/:uuid'`, async () => {
        const searchElement = examples[modelName].list[1]
        const config = {
          method: 'GET',
          path: `/api/${modelName}/:uuid`,
          modelName,
          params: {uuid: searchElement.uuid},
          querys: {},
          headers: {},
          body: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(data).toBeDefined()
        Object.keys(searchElement).forEach((key) => {
          expect(data[key]).toBeDefined()
          expect(data[key]).toEqual(searchElement[key])
        })
      })
    }
  })
}

describe('Tests for CRUD', () => {
  beforeAll(async () => {
    try {
      const seq = await db.open()
      const models = Object.values(seq.models)
      const operatingModels = ['City', 'Supplier', 'Employee']
      db.relations()
      examples = models.reduce(
        (exps, model) => {
          exps[model.name] = getExample(model, {...exps?.[model.name]})
          return exps
        },
        JSON.parse(fs.readFileSync(PATH_EXP, 'utf8')) ?? {}
      )
      fs.writeFileSync(PATH_EXP, JSON.stringify(examples), 'utf8')
      addModels(models, examples)
      await seq.sync({force: true})
      for (const modelName of Object.keys(seq.models)) {
        if (!operatingModels.includes(modelName)) {
          await seq.models[modelName].bulkCreate(examples[modelName].list)
        }
      }
      for (const modelName of operatingModels) {
        await seq.models[modelName].bulkCreate(examples[modelName].list)
      }
      await db.close()
    } catch (error) {
      console.error(error)
    }
  })

  // testModel('Supplier')
  // testModel('Employee')

  filesModel.forEach((file) => {
    const path = `${PATH_MODELS}/${file}`
    const stats = fs.statSync(path)
    if (stats.isFile()) {
      const modelName = file.split('.')[0]
      testModel(modelName)
    }
  })

  afterAll(saveSwagger)
})
