import type {ModelAttributeColumnOptions, Model} from 'sequelize'

type Attribute = ModelAttributeColumnOptions<Model<any, any>>

export const getTypeExp = (attribute: Attribute) => {
  const columType = attribute.type.toString({})
  if (columType === 'TINYINT(1)') return 'boolean'
  if (columType.includes('VARCHAR')) return 'string'
  if (columType.includes('CHAR')) return 'string'
  if (columType.includes('TEXT')) return 'string'
  if (columType.includes('JSON')) return 'string'
  if (columType.includes('DATETIME')) return 'string'
  if (columType.includes('DATEONLY')) return 'string'
  if (columType.includes('DATE')) return 'string'
  if (columType.includes('TIME')) return 'string'
  if (columType.includes('INTEGER')) return 'number'
  if (columType.includes('NUMBER')) return 'number'
  console.log(attribute.field, columType)
  return ''
}
