import {getModels} from '@db'

export const relations = () => {
  const models = getModels()
  const {Supplier, Employee, Gender, AcademicLevel, Position} = models
  const {Arl, RiskLevel, RiskClass, Province, City, Service} = models
  const {Business, Company, Regional, Location, CompanyType} = models

  Business.hasMany(Supplier, {foreignKey: Business.tableName})
  Supplier.belongsTo(Business, {foreignKey: Business.tableName})
  Company.hasMany(Supplier, {foreignKey: Company.tableName})
  Supplier.belongsTo(Company, {foreignKey: Company.tableName})
  Regional.hasMany(Supplier, {foreignKey: Regional.tableName})
  Supplier.belongsTo(Regional, {foreignKey: Regional.tableName})
  Location.hasMany(Supplier, {foreignKey: Location.tableName})
  Supplier.belongsTo(Location, {foreignKey: Location.tableName})
  CompanyType.hasMany(Supplier, {foreignKey: CompanyType.tableName})
  Supplier.belongsTo(CompanyType, {foreignKey: CompanyType.tableName})
  Service.hasMany(Supplier, {foreignKey: Service.tableName})
  Supplier.belongsTo(Service, {foreignKey: Service.tableName})

  Supplier.hasMany(Employee, {foreignKey: Supplier.tableName})
  Employee.belongsTo(Supplier, {foreignKey: Supplier.tableName})
  Gender.hasMany(Employee, {foreignKey: Gender.tableName})
  Employee.belongsTo(Gender, {foreignKey: Gender.tableName})
  AcademicLevel.hasMany(Employee, {foreignKey: AcademicLevel.tableName})
  Employee.belongsTo(AcademicLevel, {foreignKey: AcademicLevel.tableName})
  Position.hasMany(Employee, {foreignKey: Position.tableName})
  Employee.belongsTo(Position, {foreignKey: Position.tableName})
  Province.hasMany(Employee, {foreignKey: Province.tableName})
  Employee.belongsTo(Province, {foreignKey: Province.tableName})
  City.hasMany(Employee, {foreignKey: City.tableName})
  Employee.belongsTo(City, {foreignKey: City.tableName})
  Arl.hasMany(Employee, {foreignKey: Arl.tableName})
  Employee.belongsTo(Arl, {foreignKey: Arl.tableName})
  RiskLevel.hasMany(Employee, {foreignKey: RiskLevel.tableName})
  Employee.belongsTo(RiskLevel, {foreignKey: RiskLevel.tableName})
  RiskClass.hasMany(Employee, {foreignKey: RiskClass.tableName})
  Employee.belongsTo(RiskClass, {foreignKey: RiskClass.tableName})
}
