import type {Sequelize} from 'sequelize'
import envVars from '@config/envVars'
import {NodeEnvs} from '@src/declarations/enums'

export const relations = ({models}: Sequelize) => {
  if (envVars.nodeEnv !== NodeEnvs.test) {
    const {Supplier, Employee} = models
    Employee.belongsTo(Supplier, {foreignKey: 'supplierUuid'})
    Supplier.hasMany(Employee, {foreignKey: 'supplierUuid'})
  }
}
