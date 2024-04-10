import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Province',
    {
      id: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador único para cada departamento.'
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre del departamento.'
      },
      code: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre del departamento.'
      }
    },
    {tableName: 'province'}
  )
}
