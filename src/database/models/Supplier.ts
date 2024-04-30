import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Supplier',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        comment: 'Identificador universal unico para la tabal proveedor.'
      },
      name: {
        type: DataTypes.STRING(64),
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
        comment: 'número de NIT del proveedor.'
      },
      sapCode: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        comment: 'Codigo SAP del proveedor.'
      },
      business: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Negocio.'
      },
      company: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Empresa.'
      },
      regional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Regional.'
      },
      location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Localidad.'
      },
      companyType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Tipo de empresa.'
      },
      service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Servicio prestado.'
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
