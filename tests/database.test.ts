import {migrate} from '@db/migrate'
import db from '@db'

describe('Database migrate', () => {
  beforeAll(async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
  })
  afterAll(async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
  })
  test('should execute without throwing an error', async () => {
    await expect(migrate()).resolves.not.toThrow()
  })
})
