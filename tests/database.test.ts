import db from '@db'
import {migrate} from '@db/migrate'
import masterData from '@db/migrate/masterData.json'

describe('Database', () => {
  afterAll(db.close)

  test('db close should return false', async () => {
    expect(await db.close()).toBe(false)
  })

  test('Database relations should execute throwing an error', async () => {
    expect(db.relations).toThrow(/(Sequelize has NOT been created)/)
  })

  test('Database open should execute without throwing an error', async () => {
    await expect(db.open()).resolves.not.toThrow()
  })

  test('Database relations should execute without throwing an error', async () => {
    expect(db.relations).not.toThrow()
  })

  test('db close should return true', async () => {
    expect(await db.close()).toBe(true)
  })

  test('Database migrate should execute without throwing an error', async () => {
    await expect(migrate()).resolves.not.toThrow()
  })

  test('migrate I should add the masterData rows', async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
    const {Gender} = seq.models
    await migrate()
    await db.open()
    const gender = await Gender.findAll()
    expect(gender.length).toBe(masterData.Gender.length)
  })

  test('migrate I shouldn`t have to write the DB', async () => {
    const seq = await db.open()
    db.relations()
    await seq.sync({force: true})
    const {Arl} = seq.models
    await Arl.create(masterData.Arl[0])
    await migrate()
    await db.open()
    const arl = await Arl.findAll()
    expect(arl.length).toBe(1)
  })
})
