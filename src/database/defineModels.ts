import type {Sequelize} from 'sequelize'
import defineContactData from './models/ContactData'
import defineDniType from './models/DniType'
import defineEmployee from './models/Employee'
import defineEnterpriseData from './models/EnterpriseData'
import definePersonalData from './models/PersonalData'
import defineSupplier from './models/Supplier'

export const defineModels = (sequelize: Sequelize) => {
  defineContactData(sequelize)
  defineDniType(sequelize)
  defineEmployee(sequelize)
  defineEnterpriseData(sequelize)
  definePersonalData(sequelize)
  defineSupplier(sequelize)
}
