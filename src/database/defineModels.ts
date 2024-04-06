import fs from 'fs'
import path from 'path'
import type {Sequelize, Model} from 'sequelize'

export const defineModels = async (sequelize: Sequelize) => {
  const folders = fs.readdirSync(path.join('./src/database/models'))
  const promiseDefine = folders.map(async (fileName) => {
    const route = `./models/${fileName.replace('.ts', '')}`
    const defineModel = <(sequelize: Sequelize) => Model<any>>(
      (await import(route)).default
    )
    defineModel(sequelize)
  })
  await Promise.all(promiseDefine)
}
