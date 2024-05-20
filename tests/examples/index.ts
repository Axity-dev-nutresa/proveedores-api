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

export const getExample = (model: Model, exp: any = {}, md: any[] = []) => {
  const example: any = {}
  example.list = []
  example.list.push(makeExample(model, exp?.list?.[0] ?? md[0], 0))
  example.list.push(makeExample(model, exp?.list?.[1] ?? md[1], 1))
  example.new = makeExample(model, exp?.new ?? md[2], 2)
  const pkKey = getPkKey(model)
  example.edit = {
    ...makeExample(model, exp?.edit ?? md[3], 3),
    [pkKey]: example.list[1][pkKey]
  }
  return example
}
