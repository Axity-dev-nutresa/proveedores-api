import statusCodes from '@config/statusCodes'
import {handler} from '@src/services'
import agent from './agent'

const CONTENT_TYPE = 'content-type'
const URL_MK = 'https://proveedores-api.s3.us-east-1.amazonaws.com/tests/image.png'
const lambda = agent(handler)

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3: jest.fn()
  }
})

jest.mock('@aws-sdk/lib-storage', () => {
  return {
    Upload: jest.fn().mockImplementation(() => {
      return {
        done: jest.fn().mockResolvedValue({Location: URL_MK})
      }
    })
  }
})

describe('Service fileS3  NOT FOUND', () => {
  //afterAll(saveSwagger)

  test(`POST: '/service/fileS3' NOT FOUND`, async () => {
    const config = {
      tag: '',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      headers: {},
      body: null
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.BAD_REQUEST)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data?.error).toMatch(/(The file was not found.)/)
  })

  test(`POST: '/service/fileS3' `, async () => {
    const config = {
      tag: 'Services',
      method: 'POST',
      path: '/service/fileS3',
      params: {},
      queries: {},
      headers: {
        ['content-type']:
          'multipart/form-data; boundary=----WebKitFormBoundaryeUvi5ecv64kGABPT'
      },
      body: 'LS0tLS0tV2ViS2l0Rm9ybUJvdW5kYXJ5ZVV2aTVlY3Y2NGtHQUJQVA0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJmaWxlIjsgZmlsZW5hbWU9ImltYWdlLnBuZyINCkNvbnRlbnQtVHlwZTogaW1hZ2UvcG5nDQoNColQTkcNChoKAAAADUlIRFIAAAADAAAAAwgGAAAAVii1vwAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAMklEQVQYVwEnANj/Adnj3v8NCgsACAYIAALO29QA3+jkAPP29AADJDwwgO7z8QAKBggASDUP1/lFQKUAAAAASUVORK5CYIINCi0tLS0tLVdlYktpdEZvcm1Cb3VuZGFyeWVVdmk1ZWN2NjRrR0FCUFQNCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0iZmlsZVBhdGgiDQoNCnRlc3RzL2ltYWdlDQotLS0tLS1XZWJLaXRGb3JtQm91bmRhcnllVXZpNWVjdjY0a0dBQlBULS0NCg=='
    }
    const {statusCode, headers, data} = await lambda(config)
    expect(statusCode).toBe(statusCodes.OK)
    expect(headers?.[CONTENT_TYPE]).toMatch(/application\/json/)
    expect(data).toBeDefined()
    expect(data.urlS3).toBe(URL_MK)
  })
})
