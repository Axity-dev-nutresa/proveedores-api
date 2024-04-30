import type {Sequelize} from 'sequelize'
import defineAcademicLevel from './models/AcademicLevel'
import defineAfp from './models/Afp'
import defineArl from './models/Arl'
import defineBloodGroup from './models/BloodGroup'
import defineBusiness from './models/Business'
import defineCcf from './models/Ccf'
import defineCity from './models/City'
import defineCivilStatus from './models/CivilStatus'
import defineCompany from './models/Company'
import defineCompanyType from './models/CompanyType'
import defineContactData from './models/ContactData'
import defineDniType from './models/DniType'
import defineEmployee from './models/Employee'
import defineEnterpriseData from './models/EnterpriseData'
import defineEps from './models/Eps'
import defineGender from './models/Gender'
import defineLocation from './models/Location'
import definePersonalData from './models/PersonalData'
import definePosition from './models/Position'
import defineProvince from './models/Province'
import defineRegional from './models/Regional'
import defineRiskClass from './models/RiskClass'
import defineRiskLevel from './models/RiskLevel'
import defineRole from './models/Role'
import defineService from './models/Service'
import defineSupplier from './models/Supplier'

export const defineModels = (sequelize: Sequelize) => {
  defineAcademicLevel(sequelize)
  defineAfp(sequelize)
  defineArl(sequelize)
  defineBloodGroup(sequelize)
  defineBusiness(sequelize)
  defineCcf(sequelize)
  defineCity(sequelize)
  defineCivilStatus(sequelize)
  defineCompany(sequelize)
  defineCompanyType(sequelize)
  defineContactData(sequelize)
  defineDniType(sequelize)
  defineEmployee(sequelize)
  defineEnterpriseData(sequelize)
  defineEps(sequelize)
  defineGender(sequelize)
  defineLocation(sequelize)
  definePersonalData(sequelize)
  definePosition(sequelize)
  defineProvince(sequelize)
  defineRegional(sequelize)
  defineRiskClass(sequelize)
  defineRiskLevel(sequelize)
  defineRole(sequelize)
  defineService(sequelize)
  defineSupplier(sequelize)
}
