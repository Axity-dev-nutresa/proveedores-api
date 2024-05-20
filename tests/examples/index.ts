import fs from 'fs'
import type {Model} from '../types'
import {makeAttribute} from './makeAttribute'

const makeExample = (model: Model, exp: any, item: number) => {
  const attributes = Object.entries(model.getAttributes())
  return attributes.reduce((example: any, [key, attribute]) => {
    if (exp?.[key] !== undefined) example[key] = exp[key]
    else {
      const newAttribute = makeAttribute(attribute, model.tableName, item)
      if (newAttribute !== undefined) example[key] = newAttribute
    }
    return example
  }, {})
}

const getPkKey = (model: Model): string => {
  const attributes = Object.entries(model.getAttributes())
  return attributes.reduce((pkKey, [key, attribute]) => {
    if (attribute.primaryKey) return key
    else return pkKey
  }, '')
}

export const getExample = (model: Model, exp: any) => {
  if (!exp) exp = {}
  if (!exp.list) exp.list = []
  exp.list[0] = makeExample(model, exp.list[0], 0)
  exp.list[1] = makeExample(model, exp.list[1], 1)
  exp.new = makeExample(model, exp?.new, 2)
  const pkKey = getPkKey(model)
  exp.edit = {
    ...makeExample(model, exp?.edit, 3),
    [pkKey]: exp.list[0][pkKey]
  }
  return exp
}

export const makeExamples = (models: Model[]) => {
  const examples = fs.readFileSync('./tests/examples/examples.json', 'utf8')
  const newExamples = models.reduce(
    (exps, model) => {
      exps[model.name] = getExample(model, {...exps?.[model.name]})
      return exps
    },
    JSON.parse(examples) ?? {}
  )
  fs.writeFileSync('./tests/examples/examples.json', JSON.stringify(newExamples), 'utf8')
  return newExamples
}
