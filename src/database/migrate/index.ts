import db from '@db'
import masterData from '@db/migrate/masterData.json'

export const migrate = async () => {
  console.log('migrating...')
  const sequelize = await db.open()
  console.log(Object.keys(sequelize.models).length)
  db.relations()
  for (const [modelName, data] of Object.entries(masterData)) {
    const Model = sequelize.models[modelName]
    const values = await Model.findAll()
    if (values.length === 0) await Model.bulkCreate(data)
  }
  await sequelize.close()
  console.log('migrated')
}
