import statusCodes from '@config/statusCodes'
import envVars from '@src/config/envVars'
import {handler} from '@src/services/lambda'
import fs from 'fs'
import agent from './agent'
import {saveSwagger} from './swagger'

const CONTENT_TYPE = 'content-type'
const lambda = agent(handler)

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3: jest.fn()
  }
})

jest.mock('@aws-sdk/lib-storage', () => {
  return {
    Upload: jest.fn().mockImplementation(({params: {Bucket, Key}}) => {
      return {
        done: jest.fn().mockResolvedValue({
          Location: `https://${Bucket}.s3.us-east-1.amazonaws.com/${Key}`
        })
      }
    })
  }
})

describe('Service fileS3', () => {
  afterAll(saveSwagger)

  test(`POST: '/service/fileS3'`, async () => {
    const file = fs.createReadStream('./tests/examples/image.png')
    const filePath = 'tests/image'
    const config = {
      tag: 'FileS3',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      header: 'multipart/form-data',
      data: {file, filePath}
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.OK)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data?.urlS3).toBe(
      `https://${envVars.awsS3.bucket}.s3.us-east-1.amazonaws.com/${filePath}.png`
    )
  })

  test(`POST: '/service/fileS3' error file`, async () => {
    const config = {
      tag: 'FileS3',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      header: 'multipart/form-data',
      data: {filePath: 'test/file'}
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.BAD_REQUEST)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data.message).toMatch(/(file)/)
  })

  test(`POST: '/service/fileS3' error filePath`, async () => {
    const file = fs.createReadStream('./tests/examples/image.png')
    const config = {
      tag: 'FileS3',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      header: 'multipart/form-data',
      data: {file}
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.BAD_REQUEST)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data.message).toMatch(/(filePath)/)
  })

  test('Error: lambda without event', async () => {
    const res: any = await handler(null as any, null as any, null as any)
    expect(res?.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
    expect(res?.headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(JSON.parse(res?.body)?.message).toMatch(/(not have a valid value)/)
  })
})
