import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'PersonalData',
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador universal unico para el empleado.'
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Fecha de nacimiento del empleado.'
      },
      picture: {
        type: DataTypes.STRING(256),
        allowNull: false,
        comment: 'Foto de perfil del empleado.'
      },
      rh: {
        type: DataTypes.STRING(4),
        allowNull: false,
        comment: 'Grupo sanguíneo del empleado.'
      },
      gender: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Genero del empleado.'
      },
      civilStatus: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Estado sivil del empleado.'
      },
      numberChildren: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Número de hijos del empleado.'
      }
    },
    {tableName: 'personal_data'}
  )
}
