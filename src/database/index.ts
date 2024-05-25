import envVars from '@config/envVars'
import mysql2 from 'mysql2'
import {Sequelize} from 'sequelize'
import {defineModels} from '@db/defineModels'
import {relations} from '@db/relations'

let sequelize: Sequelize | null = null

const purgeSequelize = (sqz: any): Sequelize => {
  // sqz is of type any so that getConnection can be removed
  sqz.connectionManager.initPools()
  if (sqz.connectionManager.hasOwnProperty('getConnection')) {
    delete sqz.connectionManager.getConnection
  }
  return sqz
}

export const open = async (): Promise<Sequelize> => {
  if (!sequelize) {
    sequelize = new Sequelize(envVars.dbName, envVars.dbUser, envVars.dbPass, {
      host: envVars.dbHost,
      dialect: 'mysql',
      dialectModule: mysql2,
      dialectOptions: {
        ssl: envVars.dbSsl
      },
      pool: {
        min: 0,
        max: 9,
        idle: 0,
        acquire: 9000,
        evict: 9000
      },
      port: envVars.dbPort,
      logging: false,
      define: {
        freezeTableName: true,
        underscored: true,
        timestamps: false
      }
    })

    defineModels(sequelize)
    await sequelize.sync({force: false})
    return sequelize
  }
  return purgeSequelize(sequelize)
}

export const close = async () => {
  if (!sequelize) return false
  await sequelize.connectionManager.close()
  sequelize = null
  return true
}

export const getModels = () => {
  if (!sequelize) throw new Error('Sequelize has NOT been created')
  return sequelize.models
}

export default {open, close, relations, getModels}
