import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Ccf',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para la caja de compensacion familiar.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre de la caja de compensacion familiar.'
      }
    },
    {tableName: 'ccf'}
  )
}
