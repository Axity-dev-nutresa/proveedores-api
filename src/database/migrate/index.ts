import db from '@db'

const migrate = async () => {
  console.log('migrating...')
  const sqz = await db.open()
  console.log(Object.keys(sqz.models).length)
  await db.close()
  console.log('migrated')
}

migrate()
