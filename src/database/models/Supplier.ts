import {DataTypes} from 'sequelize'

export default {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
    comment: 'Identificador universal unico para la tabal proveedor.'
  },
  name: {
    type: DataTypes.STRING(99),
    allowNull: false,
    comment: 'Nombre del proveedor.'
  },
  description: {
    type: DataTypes.STRING(300),
    allowNull: true,
    comment: 'Descripcion del proveedor.'
  },
  nit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    inique: true,
    comment: 'NIT del proveedor.'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Indica si el proveedos esta activo.'
  },
  creatorUser: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment: 'Nombre de usuario que creo el proveedor.'
  },
  editorUser: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment: 'Nombre de usuario que edito el proveedor.'
  }
}
