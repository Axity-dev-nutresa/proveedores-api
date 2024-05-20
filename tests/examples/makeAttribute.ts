import {noCase} from 'change-case-all'
import crypto from 'crypto'
import type {ModelAttributeColumnOptions} from 'sequelize'

const dis = ['A', 'B', 'new', 'edit', '']
const codes = ['A', 'B', 'C', 'D', 'E']
const ids = [1, 2, 3, 4, 5]
const uuids = [
  'b7b47508-e125-40f2-85c7-6de96eb3356c',
  '856d2da5-8aef-4801-833f-257122aca09b',
  'f4f06035-ad0b-4f71-94fa-bdf23e99803e',
  '6788c1b7-1c03-430f-9aa4-6d4ca95bd793',
  'b7b47508-e125-40f2-85c7-6de96eb3356c'
]

const getLength = (stringT: string) => {
  const num = Number(stringT.replace(/\D/gi, ''))
  if (Number.isNaN(num)) return 1
  return num
}

export const makeAttribute = (
  colum: ModelAttributeColumnOptions,
  tableName: string,
  item: number
) => {
  const strType = colum.type.toString({})
  if (colum.primaryKey) {
    if (strType === 'CHAR(36) BINARY') return uuids[item]
    if (/(INTEGER)|(NUMBER)/i.test(strType)) return ids[item]
    if (/(VARCHAR)/i.test(strType)) return codes[item]
  }

  if (colum.references) {
    if (strType === 'CHAR(36) BINARY') return uuids[0]
    if (/(INTEGER)|(NUMBER)/i.test(strType)) return ids[0]
    if (/(VARCHAR)/i.test(strType)) return codes[0]
  }

  if (/(VARCHAR)|(TEXT)|(CHAR)/i.test(strType)) {
    if (colum.defaultValue) return colum.defaultValue
    const expColum = `${dis[item]} ${noCase(tableName)} ${noCase(colum.field ?? '')}`
    return expColum.slice(0, getLength(strType))
  }

  if (colum.defaultValue) return colum.defaultValue

  if (strType === 'TINYINT(1)') return true

  if (/(INTEGER)|(NUMBER)/i.test(strType)) return crypto.randomInt(1024)

  if (/(DATE)|(DATEONLY)/i.test(strType)) {
    return new Date(Date.now()).toJSON().split('T')[0]
  }

  if (/(VIRTUAL)/i.test(strType)) return undefined

  console.log(colum.field, strType)
  throw new Error(`Type "${strType}" not supported`)
}
