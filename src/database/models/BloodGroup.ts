import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'BloodGroup',
    {
      code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Código único para el grupo sanguíneo.'
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
