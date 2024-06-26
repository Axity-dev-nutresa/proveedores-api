import statusCodes from '@config/statusCodes'
import db from '@db'
import {handler} from '@src/api/lambda'
import masterData from '@src/database/migrate/masterData.json'
import fs from 'fs'
import agent from './agent'
import {getExample} from './examples'
import {addModel, saveSwagger} from './swagger'

const PATH_MODELS = './src/database/models'
const PATH_EXP = './tests/examples/examples.json'
const CONTENT_TYPE = 'content-type'
const relatedModels = ['City', 'Supplier', 'Employee']
const filesModel = fs.readdirSync(PATH_MODELS)
const lambda = agent(handler)
const examples = JSON.parse(fs.readFileSync(PATH_EXP, 'utf8'))

const testModel = (modelName: string) => {
  describe(`Routes for model ${modelName}`, () => {
    test(`GET: '/api/${modelName}'`, async () => {
      const config = {
        method: 'GET',
        path: `/api/${modelName}`,
        tag: modelName,
        params: {},
        queries: {},
        header: '',
        data: null
      }
      const {statusCode, headers, data} = await lambda(config)
      expect(statusCode).toBe(statusCodes.OK)
      expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(examples[modelName].list.length)
    })

    if (modelName === 'Employee') {
      test(`GET: '/api/${modelName}?supplier=value'`, async () => {
        const {supplier} = examples[modelName].list[1]
        const config = {
          method: 'GET',
          path: `/api/${modelName}`,
          tag: modelName,
          params: {},
          queries: {supplier},
          header: '',
          data: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(Array.isArray(data)).toBe(true)
        const list = examples[modelName].list.filter((e: any) => e.supplier === supplier)
        expect(data.length).toBe(list.length)
      })
    }

    if (modelName === 'Supplier') {
      test(`GET: '/api/${modelName}?uuid=value'`, async () => {
        const {uuid} = examples[modelName].list[1]
        const config = {
          method: 'GET',
          path: `/api/${modelName}`,
          tag: modelName,
          params: {},
          queries: {uuid},
          header: '',
          data: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(Array.isArray(data)).toBe(true)
        const list = examples[modelName].list.filter((e: any) => e.uuid === uuid)
        expect(data.length).toBe(list.length)
      })
    }

    if (modelName === 'City') {
      test(`GET: '/api/${modelName}?province=value'`, async () => {
        const {province} = examples[modelName].list[1]
        const config = {
          method: 'GET',
          path: `/api/${modelName}`,
          tag: modelName,
          params: {},
          queries: {province},
          header: '',
          data: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(Array.isArray(data)).toBe(true)
        const list = examples[modelName].list.filter((e: any) => e.province === province)
        expect(data.length).toBe(list.length)
      })
    }

    if (['Employee', 'Supplier'].includes(modelName)) {
      test(`GET: '/api/${modelName}/:uuid'`, async () => {
        const searchElement = examples[modelName].list[0]
        const config = {
          method: 'GET',
          path: `/api/${modelName}/:uuid`,
          tag: modelName,
          params: {uuid: searchElement.uuid},
          queries: {},
          header: '',
          data: null
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

      test(`GET: '/api/${modelName}/:uuid' BAD REQUEST`, async () => {
        const config = {
          method: 'GET',
          path: `/api/${modelName}/:uuid`,
          tag: modelName,
          params: {uuid: 'new'},
          queries: {},
          header: '',
          data: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(data).toBeDefined()
        expect(data?.message).toMatch(/(new)/)
      })

      test(`POST: '/api/${modelName}' error`, async () => {
        const newElement = examples[modelName].list[0]
        const config = {
          method: 'POST',
          path: `/api/${modelName}`,
          tag: modelName,
          params: {},
          queries: {},
          header: 'application/json',
          data: newElement
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(data?.message).toMatch(/(Duplicate entry)/)
      })

      test(`POST: '/api/${modelName}'`, async () => {
        const newElement = examples[modelName].new
        const config = {
          method: 'POST',
          path: `/api/${modelName}`,
          tag: modelName,
          params: {},
          queries: {},
          header: 'application/json',
          data: newElement
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        Object.keys(newElement).forEach((key) => {
          expect(data?.[key]).toEqual(newElement[key])
        })
      })

      test(`PUT: '/api/${modelName}/:uuid' BAD REQUEST`, async () => {
        const config = {
          method: 'PUT',
          path: `/api/${modelName}/:uuid`,
          tag: modelName,
          params: {uuid: 'new'},
          queries: {},
          header: '',
          data: null
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        expect(data).toBeDefined()
        expect(data?.message).toMatch(/(new)/)
      })

      test(`PUT: '/api/${modelName}/:uuid'`, async () => {
        const editElement = examples[modelName].edit
        const config = {
          method: 'PUT',
          path: `/api/${modelName}/:uuid`,
          tag: modelName,
          params: {uuid: editElement.uuid},
          queries: {},
          header: 'application/json',
          data: editElement
        }
        const {statusCode, headers, data} = await lambda(config)
        expect(statusCode).toBe(statusCodes.OK)
        expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
        Object.keys(editElement).forEach((key) => {
          expect(data?.[key]).toEqual(editElement[key])
        })
      })
    }
  })
}

describe('Tests for CRUD', () => {
  beforeAll(async () => {
    try {
      const bk: any = {}
      const seq = await db.open()
      db.relations()
      await seq.sync({force: true})
      for (const [modelName, Model] of Object.entries(seq.models)) {
        examples[modelName] = getExample(
          Model,
          examples?.[modelName],
          masterData?.[modelName as keyof typeof masterData]
        )
        addModel(Model, examples[modelName].list[0])
        bk[modelName] = await Model.findAll()
        if (!relatedModels.includes(modelName)) {
          await Model.bulkCreate(examples[modelName].list)
        }
      }
      for (const modelName of relatedModels) {
        await seq.models[modelName].bulkCreate(examples[modelName].list)
      }
      fs.writeFileSync(PATH_EXP, JSON.stringify(examples), 'utf8')
      await db.close()
    } catch (error) {
      console.error(error)
    }
  })

  afterAll(async () => {
    saveSwagger()
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
  })

  filesModel.forEach((file) => {
    const path = `${PATH_MODELS}/${file}`
    const stats = fs.statSync(path)
    if (stats.isFile()) {
      const modelName = file.split('.')[0]
      testModel(modelName)
    }
  })

  test('Error: lambda without event', async () => {
    const res: any = await handler(null as any, null as any, null as any)
    expect(res?.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
    expect(res?.headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(JSON.parse(res?.body)?.message).toMatch(/(not have a valid value)/)
  })
})
