import statusCodes from '@src/config/statusCodes'
import app, {server} from '@src/index'
import request from 'supertest'

describe('GET /api/Employee', () => {
  beforeAll(async () => server)
  afterAll(async () => (await server)?.close())
  test('should respond with a array', async () => {
    const res = await request(app).get('/api/Employee')
    expect(res.statusCode).toBe(statusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
  })
  test('should respond with a array', async () => {
    const res = await request(app).get('/api/Gender/M')
    expect(res.statusCode).toBe(statusCodes.OK)
    expect(res.body).toBeDefined()
  })
  test('should respond with a message', async () => {
    const res = await request(app).get('/api/Test')
    expect(res.statusCode).toBe(statusCodes.NOT_FOUND)
    expect(res.body.message).toMatch(/Test/)
  })
})
