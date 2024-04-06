import type {Sequelize} from 'sequelize'
import supplier from './models/Supplier'
import employee from './models/Employee'
import personalData from './models/PersonalData'
import contactInfo from './models/ContactInfo'

export const defineModels = (sequelize: Sequelize) => {
  sequelize.define('Supplier', supplier)
  sequelize.define('Employee', employee)
  sequelize.define('PersonalData', personalData, {tableName: 'personal_data'})
  sequelize.define('ContactInfo', contactInfo, {tableName: 'contact_info'})
}
