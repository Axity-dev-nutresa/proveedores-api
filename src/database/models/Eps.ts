import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Eps',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para la empresa prestadora de salud.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre de la empresa prestadora de salud.'
      },
      nit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        comment: 'NIT de la empresa prestadora de salud.'
      },
      regimen: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de la empresa prestadora de salud.'
      }
    },
    {tableName: 'eps'}
  )
}
