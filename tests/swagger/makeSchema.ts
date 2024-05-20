import type {ModelStatic, Model} from 'sequelize'

export const makeSchema = (model: ModelStatic<Model>, example: any) => {
  return {
    type: 'object',
    properties: Object.entries(model.getAttributes()).reduce(
      (properties: any, [key, attribute]) => {
        if (attribute.type.toString({}) === 'VIRTUAL') return properties
        properties[key] = {
          type: typeof example[key],
          required: attribute.allowNull !== true,
          description:
            attribute.comment ??
            `${model.tableName} ${attribute.field?.replace(/_/g, ' ')}`,
          example: example[key]
        }
        return properties
      },
      {}
    )
  }
}
