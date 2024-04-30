import db from '@db'
import {relations} from '../relations'

const migrate = async () => {
  try {
    console.log('migrating...')
    const sequelize = await db.open()
    console.log(Object.keys(sequelize.models).length)
    relations(sequelize)
    await sequelize.sync({force: true})
    await sequelize.close()
    console.log('migrated')
  } catch (error) {
    console.error(error)
  }
}

migrate()
