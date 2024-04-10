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
        comment: 'Identificador único para la caja de compensación familiar.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre de la caja de compensacion familiar.'
      },
      nit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'NIT de caja de compensacion familiar.'
      },
      province: {
        type: DataTypes.STRING(2),
        allowNull: false,
        comment: 'Codigo del departamento.'
      }
    },
    {tableName: 'ccf'}
  )
}
