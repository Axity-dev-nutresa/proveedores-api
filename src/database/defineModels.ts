import type {Sequelize} from 'sequelize'
import defineAcademicLevel from './models/AcademicLevel'
import defineArl from './models/Arl'
import defineBusiness from './models/Business'
import defineCity from './models/City'
import defineCompany from './models/Company'
import defineCompanyType from './models/CompanyType'
import defineDniType from './models/DniType'
import defineEmployee from './models/Employee'
import defineGender from './models/Gender'
import defineLocation from './models/Location'
import definePosition from './models/Position'
import defineProvince from './models/Province'
import defineRegional from './models/Regional'
import defineRiskClass from './models/RiskClass'
import defineRiskLevel from './models/RiskLevel'
import defineService from './models/Service'
import defineSupplier from './models/Supplier'

export const defineModels = (sequelize: Sequelize) => {
  defineAcademicLevel(sequelize)
  defineArl(sequelize)
  defineBusiness(sequelize)
  defineCity(sequelize)
  defineCompany(sequelize)
  defineCompanyType(sequelize)
  defineDniType(sequelize)
  defineEmployee(sequelize)
  defineGender(sequelize)
  defineLocation(sequelize)
  definePosition(sequelize)
  defineProvince(sequelize)
  defineRegional(sequelize)
  defineRiskClass(sequelize)
  defineRiskLevel(sequelize)
  defineService(sequelize)
  defineSupplier(sequelize)
}
