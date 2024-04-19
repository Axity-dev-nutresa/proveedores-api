import db from '@db'
import {relations} from '../relations'

const migrate = async () => {
  console.log('migrating...')
  const sequelize = await db.open()
  console.log(Object.keys(sequelize.models).length)
  relations(sequelize)
  await db.close()
  console.log('migrated')
}

migrate()
