import {DataTypes} from 'sequelize'

export default {
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
    type: DataTypes.STRING(300),
    allowNull: false,
    comment: 'Foto de perfil del empleado.'
  },
  rh: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: 'Grupo sanguíneo del empleado.'
  },
  gender: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Genero del empleado.'
  },
  civilStatus: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Estado sivil del empleado.'
  },
  numberChildren: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Número de hijos del empleado.'
  },
  eps: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Empresa prestadora de salud del empleado.'
  },
  // afp: {
  //   type: DataTypes.STRING(24),
  //   allowNull: false,
  //   comment: 'Administradoras de fondos de pensiones del empleado.'
  // },
  // ccf: {
  //   type: DataTypes.STRING(24),
  //   allowNull: false,
  //   comment: 'Caja de compensacion familiar del empleado.'
  // },
  academicLevel: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Nivel académico del empleado.'
  },
  academicTitle: {
    type: DataTypes.STRING(99),
    allowNull: false,
    comment: 'Titulo académico obtenido por el empleado.'
  }
}
