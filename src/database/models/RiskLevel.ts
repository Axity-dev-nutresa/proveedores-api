import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'RiskLevel',
    {
      code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador único para el nivel de riesgo.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre del nivel de riesgo.'
      }
    },
    {tableName: 'risk_level'}
  )
}
