import db from '@db'
import masterData from '@src/database/migrate/masterData.json'

const migrate = async () => {
  try {
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
  } catch (error) {
    console.error(error)
  }
}

migrate()
