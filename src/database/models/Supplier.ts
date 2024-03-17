import {DataTypes} from 'sequelize'

export default {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
    comment: 'SUP del usuario que creo el proveedor.'
  },
  editorUser: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment: 'SUB del ultimo usuario que edito el proveedor.'
  }
}
