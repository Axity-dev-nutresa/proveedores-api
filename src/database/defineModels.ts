import type {Sequelize} from 'sequelize'
import supplier from './models/Supplier'
import employee from './models/Employee'

export const defineModels = (sequelize: Sequelize) => {
  sequelize.define('Supplier', supplier)
  sequelize.define('Employee', employee)
}
