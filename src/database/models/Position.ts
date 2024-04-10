import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Position',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para cada cargo.'
      },
      name: {
        type: DataTypes.STRING(36),
        allowNull: false,
        comment: 'Nombre del cargo.'
      },
      description: {
        type: DataTypes.STRING(256),
        allowNull: false,
        comment: 'Nombre del cargo.'
      }
    },
    {tableName: 'position'}
  )
}
