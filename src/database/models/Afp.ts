import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Afp',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para la administradoras de fondos de pensiones.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre de la administradoras de fondos de pensiones.'
      },
      nit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'NIT de la administradoras de fondos de pensiones.'
      }
    },
    {tableName: 'afp'}
  )
}
