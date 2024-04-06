import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'ContactData',
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador universal unico para el empleado.'
      },
      cellPhone: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Numero de celular del empleado.'
      },
      email: {
        type: DataTypes.STRING(99),
        allowNull: false,
        comment: 'Correo electronico personal del empleado.'
      },
      province: {
        type: DataTypes.STRING(99),
        allowNull: false,
        comment: 'Departamento de residencia del empleado.'
      },
      city: {
        type: DataTypes.STRING(99),
        allowNull: false,
        comment: 'Ciudad de residencia del empleado.'
      },
      address: {
        type: DataTypes.STRING(99),
        allowNull: false,
        comment: 'Direccion de residencia del empleado.'
      },
      phone: {
        type: DataTypes.STRING(16),
        allowNull: true,
        comment: 'Numero de telefono fijo del empleado.'
      }
    },
    {tableName: 'contact_data'}
  )
}
