import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'BloodGroup',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: 'Identificador único para el grupo sanguíneo.'
      },
      bloodType: {
        type: DataTypes.STRING(2),
        allowNull: false,
        comment: 'Tipo de sangre.'
      },
      rhFactor: {
        type: DataTypes.ENUM('+', '-'),
        allowNull: false,
        comment: 'Factor RH.'
      }
    },
    {tableName: 'blood_group'}
  )
}
