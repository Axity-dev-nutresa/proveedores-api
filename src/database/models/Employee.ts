import {DataTypes} from 'sequelize'

export default {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Identificador universal unico para el empleado.'
  },
  firstName: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Primer nombre del empleado.'
  },
  middleName: {
    type: DataTypes.STRING(24),
    allowNull: true,
    comment: 'Segundo nombre del empleado.'
  },
  surname: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: 'Primer nombre del empleado.'
  },
  middleSurname: {
    type: DataTypes.STRING(24),
    allowNull: true,
    comment: 'Segundo nombre del empleado.'
  },
  dniType: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: 'Tipo de documento del empleado.'
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Numero de documento del empleado.'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Indica si el empleado esta activo.'
  },
  creatorUser: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment: 'Nombre de usuario que creo el empleado.'
  },
  editorUser: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment: 'Nombre de usuario que edito el empleado.'
  }
}
