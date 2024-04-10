import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'AcademicLevel',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Identificador único para el nivel académico.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Descripción del nivel académico.'
      }
    },
    {tableName: 'academic_level'}
  )
}
