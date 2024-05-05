import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Rh',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para el grupo sanguineo.'
      },
      name: {
        type: DataTypes.STRING(4),
        allowNull: false,
        comment: 'Nombre del grupo sanguineo.'
      }
    },
    {tableName: 'rh'}
  )
}
