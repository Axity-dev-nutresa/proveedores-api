import request from 'supertest'
import app, {server} from '@src/index'
import statusCodes from '@src/config/statusCodes'

describe('GET /api/Employee', () => {
  beforeAll(async () => await server)
  afterAll(async () => (await server)?.close())
  test('should respond with a array', async () => {
    const res = await request(app).get('/api/Employee')
    expect(res.statusCode).toBe(statusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
  })
  test('should respond with a message', async () => {
    const res = await request(app).get('/api/Test')
    expect(res.statusCode).toBe(statusCodes.NOT_FOUND)
    expect(res.body.message).toMatch(/Test/)
  })
})
