import db from '@db'
import {relations} from '../relations'

const migrate = async () => {
  try {
    console.log('migrating...')
    const sequelize = await db.open()
    // const backup = Object.entries(sequelize.models).reduce( (bk, [modelName, Model]) => {
    //   bk[modelName] = await Model.findAll() ?? []
    //   return bk
    // }, {} as {[m: string]: any[]})
    console.log(Object.keys(sequelize.models).length)
    relations()
    await sequelize.sync({force: true})
    await sequelize.close()
    console.log('migrated')
  } catch (error) {
    console.error(error)
  }
}

migrate()
