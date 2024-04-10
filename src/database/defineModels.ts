import type {Sequelize} from 'sequelize'
import defineAcademicLevel from './models/AcademicLevel'
import defineAfp from './models/Afp'
import defineBloodGroup from './models/BloodGroup'
import defineCcf from './models/Ccf'
import defineCity from './models/City'
import defineCivilStatus from './models/CivilStatus'
import defineContactData from './models/ContactData'
import defineDniType from './models/DniType'
import defineEmployee from './models/Employee'
import defineEnterpriseData from './models/EnterpriseData'
import defineEps from './models/Eps'
import defineGender from './models/Gender'
import definePersonalData from './models/PersonalData'
import definePosition from './models/Position'
import defineProvince from './models/Province'
import defineRole from './models/Role'
import defineSupplier from './models/Supplier'

export const defineModels = (sequelize: Sequelize) => {
  defineAcademicLevel(sequelize)
  defineAfp(sequelize)
  defineBloodGroup(sequelize)
  defineCcf(sequelize)
  defineCity(sequelize)
  defineCivilStatus(sequelize)
  defineContactData(sequelize)
  defineDniType(sequelize)
  defineEmployee(sequelize)
  defineEnterpriseData(sequelize)
  defineEps(sequelize)
  defineGender(sequelize)
  definePersonalData(sequelize)
  definePosition(sequelize)
  defineProvince(sequelize)
  defineRole(sequelize)
  defineSupplier(sequelize)
}
