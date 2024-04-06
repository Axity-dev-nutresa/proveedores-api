import type {Sequelize} from 'sequelize'

export const relations = ({models}: Sequelize) => {
  const {Supplier, Employee, PersonalData, ContactData, EnterpriseData} = models
  Employee.belongsTo(Supplier, {foreignKey: 'supplier'})
  Supplier.hasMany(Employee, {foreignKey: 'supplier'})
  PersonalData.belongsTo(Employee, {foreignKey: 'uuid'})
  Employee.hasOne(PersonalData, {foreignKey: 'uuid'})
  ContactData.belongsTo(Employee, {foreignKey: 'uuid'})
  Employee.hasOne(ContactData, {foreignKey: 'uuid'})
  EnterpriseData.belongsTo(Employee, {foreignKey: 'uuid'})
  Employee.hasOne(EnterpriseData, {foreignKey: 'uuid'})
}
