import {getModels} from '@db'

export const relations = (modelName = '') => {
  const models = getModels()
  const {Supplier, Employee, Gender, AcademicLevel, Position} = models
  const {Arl, RiskLevel, RiskClass, Province, City, Service} = models
  const {Business, Company, Regional, Location, CompanyType} = models

  if (!modelName || modelName === 'Supplier') {
    Business.hasMany(Supplier, {foreignKey: 'business'})
    Supplier.belongsTo(Business, {foreignKey: 'business'})
    Company.hasMany(Supplier, {foreignKey: 'company'})
    Supplier.belongsTo(Company, {foreignKey: 'company'})
    Regional.hasMany(Supplier, {foreignKey: 'regional'})
    Supplier.belongsTo(Regional, {foreignKey: 'regional'})
    Location.hasMany(Supplier, {foreignKey: 'location'})
    Supplier.belongsTo(Location, {foreignKey: 'location'})
    CompanyType.hasMany(Supplier, {foreignKey: 'companyType'})
    Supplier.belongsTo(CompanyType, {foreignKey: 'companyType'})
    Service.hasMany(Supplier, {foreignKey: 'service'})
    Supplier.belongsTo(Service, {foreignKey: 'service'})
  }

  if (!modelName || modelName === 'Employee') {
    Supplier.hasMany(Employee, {foreignKey: 'supplier'})
    Employee.belongsTo(Supplier, {foreignKey: 'supplier'})
    Gender.hasMany(Employee, {foreignKey: 'gender'})
    Employee.belongsTo(Gender, {foreignKey: 'gender'})
    AcademicLevel.hasMany(Employee, {foreignKey: 'academicLevel'})
    Employee.belongsTo(AcademicLevel, {foreignKey: 'academicLevel'})
    Position.hasMany(Employee, {foreignKey: 'position'})
    Employee.belongsTo(Position, {foreignKey: 'position'})
    Province.hasMany(Employee, {foreignKey: 'province'})
    Employee.belongsTo(Province, {foreignKey: 'province'})
    City.hasMany(Employee, {foreignKey: 'city'})
    Employee.belongsTo(City, {foreignKey: 'city'})
    Arl.hasMany(Employee, {foreignKey: 'arl'})
    Employee.belongsTo(Arl, {foreignKey: 'arl'})
    RiskLevel.hasMany(Employee, {foreignKey: 'riskLevel'})
    Employee.belongsTo(RiskLevel, {foreignKey: 'riskLevel'})
    RiskClass.hasMany(Employee, {foreignKey: 'riskClass'})
    Employee.belongsTo(RiskClass, {foreignKey: 'riskClass'})
    Province.hasMany(City, {foreignKey: 'province'})
    City.belongsTo(Province, {foreignKey: 'province'})
  }
}
