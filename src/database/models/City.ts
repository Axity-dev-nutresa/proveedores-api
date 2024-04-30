import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'City',
    {
      id: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Código único para cada ciudad.'
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de la ciudad.'
      },
      province: {
        type: DataTypes.STRING(2),
        allowNull: false,
        comment: 'Codigo del departamento.'
      }
    },
    {tableName: 'city'}
  )
}
