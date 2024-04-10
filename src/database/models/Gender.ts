import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Gender',
    {
      code: {
        type: DataTypes.STRING(1),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Código único para el género.'
      },
      description: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Descripción del género.'
      }
    },
    {tableName: 'gender'}
  )
}
