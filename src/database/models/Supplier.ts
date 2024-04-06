import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Supplier',
    {
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
        type: DataTypes.STRING(256),
        allowNull: true,
        comment: 'Descripcion del proveedor.'
      },
      nit: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        comment: 'NIT del proveedor.'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indica si el proveedos esta activo.'
      },
      creatorUser: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de usuario que creo el proveedor.'
      },
      editorUser: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de usuario que edito el proveedor.'
      }
    },
    {tableName: 'supplier'}
  )
}
