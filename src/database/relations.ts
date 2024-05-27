import {getModels} from '@db'
import {oneToMany} from '@src/declarations/constants'
import type {Model, ModelStatic} from 'sequelize'

const relateOneToMany = (Model1: ModelStatic<Model>, Model2: ModelStatic<Model>) => {
  const foreignKey = Model2.name.charAt(0).toLowerCase() + Model2.name.slice(1)
  Model2.hasMany(Model1, {foreignKey})
  Model1.belongsTo(Model2, {foreignKey})
}

export const relations = (modelName = '') => {
  const models = getModels()

  if (!modelName) {
    Object.entries(oneToMany).forEach(([modelName1, hasOne]) => {
      hasOne.forEach((modelName2) => {
        relateOneToMany(models[modelName1], models[modelName2])
      })
    })
    return
  }

  if (oneToMany[modelName as keyof typeof oneToMany]) {
    const hasOne = oneToMany[modelName as keyof typeof oneToMany]
    hasOne.forEach((modelName2) => {
      relateOneToMany(models[modelName], models[modelName2])
    })
  }
}
