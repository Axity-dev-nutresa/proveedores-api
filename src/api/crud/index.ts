import statusCodes from '@config/statusCodes'
import db from '@db'
import {hasOne} from '@src/declarations/constants'
import {PkNotMach} from '@src/declarations/errors'
import type {Request, Response} from 'express'
import {Router} from 'express'
import {Op, WhereOptions} from 'sequelize'

export const router = Router()

router.get('/:modelName/', async (req: Request, res: Response) => {
  const {modelName} = req.params
  const Model = db.getModels()[modelName]
  const columns = Object.keys(Model.getAttributes())
  const queries = columns.reduce((where, key) => {
    const value = req.query[key]
    if (value) where.push({[key]: value})
    return where
  }, [] as WhereOptions[])
  const result = await Model.findAll({
    where: queries.length > 0 ? {[Op.and]: queries} : {}
  })
  return res.status(statusCodes.OK).json(result)
})

router.get('/:modelName/:pk', async (req: Request, res: Response) => {
  const {modelName, pk} = req.params
  const Model = db.getModels()[modelName]
  const include = hasOne[modelName as keyof typeof hasOne] ?? []
  db.relations(include.length > 0 ? modelName : undefined)
  const result = await Model.findByPk(pk, {
    include
  })
  if (!result) throw new PkNotMach(pk)
  return res.status(statusCodes.OK).json(result)
})

router.post('/:modelName/', async (req: Request, res: Response) => {
  const {modelName} = req.params
  const Model = db.getModels()[modelName]
  const result = await Model.create(req.body)
  return res.status(statusCodes.OK).json(result)
})

router.put('/:modelName/:pk', async (req: Request, res: Response) => {
  const {pk, modelName} = req.params
  const Model = db.getModels()[modelName]
  const model = await Model.findByPk(pk)
  if (!model) throw new PkNotMach(pk)
  const newModel = await model.update({...req.body})
  return res.status(statusCodes.OK).json(newModel)
})

export default router
