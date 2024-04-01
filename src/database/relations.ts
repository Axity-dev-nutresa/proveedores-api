import envVars from '@config/envVars'
import {NodeEnvs} from '@src/declarations/enums'
import type {Sequelize} from 'sequelize'

export const relations = ({models}: Sequelize) => {
  if (envVars.nodeEnv !== NodeEnvs.test) {
    const {Supplier, Employee, PersonalData} = models
    Employee.belongsTo(Supplier, {foreignKey: 'supplierUuid'})
    Supplier.hasMany(Employee, {foreignKey: 'supplierUuid'})
    PersonalData.belongsTo(Employee, {foreignKey: 'uuid'})
    Employee.hasOne(PersonalData, {foreignKey: 'uuid'})
  }
}
