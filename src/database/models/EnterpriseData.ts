import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => {
  sequelize.define(
    'EnterpriseData',
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: 'Identificador universal unico para el empleado.'
      },
      networkUser: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Usuario de red del empleado.'
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: 'Correo electronico corporativo del empleado.'
      },
      carnet: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: 'Numero de carnet del empleado.'
      },
      eps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id de la empresa prestadora de salud del empleado.'
      },
      afp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id de la administradoras de fondos de pensiones del empleado.'
      },
      ccf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id de la caja de compensación familiar del empleado.'
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id del rol del empleado.'
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id del cargo que desempeña el empleado.'
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Salario devengado por el empleado.'
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Costo por contratar al empleado.'
      }
    },
    {tableName: 'enterprise_data'}
  )
}
