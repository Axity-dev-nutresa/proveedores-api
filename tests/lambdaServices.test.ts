import statusCodes from '@config/statusCodes'
import {handler} from '@src/services'
import fs from 'fs'
import agent from './agent'
import {saveSwagger} from './swagger'
import envVars from '@src/config/envVars'

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

  test(`POST: '/service/fileS3' NOT FOUND`, async () => {
    const config = {
      tag: 'FileS3',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      header: '',
      data: null
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.BAD_REQUEST)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data?.error).toMatch(/(The file was not found.)/)
  })

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
})
