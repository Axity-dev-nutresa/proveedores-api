import type {Sequelize} from 'sequelize'
import defineAcademicLevel from '@db/models/AcademicLevel'
import defineArl from '@db/models/Arl'
import defineBusiness from '@db/models/Business'
import defineCity from '@db/models/City'
import defineCompany from '@db/models/Company'
import defineCompanyType from '@db/models/CompanyType'
import defineDniType from '@db/models/DniType'
import defineEmployee from '@db/models/Employee'
import defineGender from '@db/models/Gender'
import defineLocation from '@db/models/Location'
import definePosition from '@db/models/Position'
import defineProvince from '@db/models/Province'
import defineRegional from '@db/models/Regional'
import defineRiskClass from '@db/models/RiskClass'
import defineRiskLevel from '@db/models/RiskLevel'
import defineService from '@db/models/Service'
import defineSupplier from '@db/models/Supplier'

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
