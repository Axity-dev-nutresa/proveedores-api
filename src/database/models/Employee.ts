import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Employee',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        comment: 'Identificador universal unico para el empleado.'
      },
      dniType: {
        type: DataTypes.STRING(4),
        allowNull: false,
        comment: 'Tipo de documento del empleado.'
      },
      dni: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Numero de documento del empleado.'
      },
      firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Primer nombre del empleado.'
      },
      middleName: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: 'Segundo nombre del empleado.'
      },
      surname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Primer nombre del empleado.'
      },
      secondSurname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Segundo nombre del empleado.'
      },
      picture: {
        type: DataTypes.STRING(256),
        allowNull: true,
        comment: 'Foto de perfil del empleado.'
      },
      gender: {
        type: DataTypes.STRING(1),
        allowNull: false,
        comment: 'Genero del empleado.'
      },
      cellPhone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        comment: 'Numero de celular del empleado.'
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: 'Correo electronico corporativo del empleado.'
      },
      academicLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Nivel academico del empleado'
      },
      supplier: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'Uuid del proveedor.'
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id del cargo que desempeña el empleado.'
      },
      arl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id de la administradoras de riesgos laborales.'
      },
      province: {
        type: DataTypes.STRING(2),
        allowNull: false,
        comment: 'Departamento de residencia del empleado.'
      },
      city: {
        type: DataTypes.STRING(8),
        allowNull: false,
        comment: 'Ciudad de residencia del empleado.'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indica si el empleado esta activo.'
      },
      riskLevel: {
        type: DataTypes.STRING(4),
        allowNull: false,
        comment: 'codigo del nivel de riesgo.'
      },
      riskClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id de la clasificación de riesgo.'
      },
      egressDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Fecha de ingreso del empleado.'
      },
      entryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Fecha de egreso del empleado.'
      },
      creatorUser: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de usuario que creo el empleado.'
      },
      editorUser: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Nombre de usuario que edito el empleado.'
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('firstName')} ${this.getDataValue('middleName') ?? ''}`
        }
      },
      lastName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('surname')} ${this.getDataValue('secondSurname')}`
        }
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('firstName')} ${this.getDataValue('middleName') ?? ''} ${this.getDataValue('surname')} ${this.getDataValue('secondSurname')}`
        }
      }
    },
    {tableName: 'employee'}
  )
}
