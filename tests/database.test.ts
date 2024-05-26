import {migrate} from '@db/migrate'
import db from '@db'

describe('Database', () => {
  test('db close return false', async () => {
    expect(await db.close()).toBe(false)
  })

  test('Database relations should execute without throwing an error', async () => {
    expect(db.relations).toThrow(/(Sequelize has NOT been created)/)
  })

  test('Database open should execute without throwing an error', async () => {
    await expect(db.open()).resolves.not.toThrow()
  })

  test('db close return true', async () => {
    expect(await db.close()).toBe(true)
  })

  test('Database migrate should execute without throwing an error', async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
    await expect(migrate()).resolves.not.toThrow()
  })
})

describe('Database migrate', () => {
  beforeAll(async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
  })

  afterAll(db.close)

  test('should execute without throwing an error', async () => {
    await expect(migrate()).resolves.not.toThrow()
  })
})
