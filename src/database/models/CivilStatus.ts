import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'CivilStatus',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para el estado civil.'
      },
      description: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Descripción del estado civil.'
      }
    },
    {tableName: 'civil_status'}
  )
}
