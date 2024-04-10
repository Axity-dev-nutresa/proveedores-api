import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'CivilStatus',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
