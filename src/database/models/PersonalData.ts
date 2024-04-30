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
      bloodGroup: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Grupo sanguíneo del empleado.'
      },
      gender: {
        type: DataTypes.STRING(1),
        allowNull: false,
        comment: 'Genero del empleado.'
      },
      civilStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Estado civil del empleado.'
      },
      numberChildren: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: 'Número de hijos del empleado.'
      },
      academicLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Nivel academico del empleado'
      },
      academicTitle: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: 'Titulo academico optenido por el empleado.'
      }
    },
    {tableName: 'personal_data'}
  )
}
