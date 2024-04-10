import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'DniType',
    {
      code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador unico para el tipo de documento.'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Nombre del tipo de documento.'
      },
      minLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Mínimo de caracteres que permite cada tipo de documento.'
      },
      maxLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Máximo de caracteres que permite cada tipo de documento.'
      }
    },
    {tableName: 'dni_type'}
  )
}
