import {DataTypes} from 'sequelize'

export default {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Identificador universal unico para la tabal empleado.'
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
  documentType: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: 'Tipo de documento del empleado.'
  },
  documentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    example: () => 23,
    comment: 'Numero de documento del empleado.'
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Fecha de nacimiento del empleado.'
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
    comment: 'SUP del usuario que creo al empleado.'
  },
  editorUser: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment: 'SUB del ultimo usuario que edito al empleado.'
  }
}
