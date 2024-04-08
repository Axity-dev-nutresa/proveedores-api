import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'DniType',
    {
      id: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador unico para el tipo de documento.'
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre del tipo de documento.'
      }
    },
    {tableName: 'dni_type'}
  )
}
