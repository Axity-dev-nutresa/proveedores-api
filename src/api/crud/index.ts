import statusCodes from '@config/statusCodes'
import {getModels} from '@db'
import {PkNotMach} from '@src/declarations/errors'
import type {Request, Response} from 'express'
import {Router} from 'express'
import {Op} from 'sequelize'

export const router = Router()

router.get('/:modelName/', async (req: Request, res: Response): Promise<any> => {
  const {modelName} = req.params
  const Model = getModels()[modelName]
  const columns = Object.keys(Model.getAttributes())
  const queries = columns.reduce((acc, key) => {
    const value = req.query[key]
    if (value) acc.push({[key]: value})
    return acc
  }, [] as any)
  const result = await Model.findAll({
    where: queries.length > 0 ? {[Op.and]: queries} : {}
  })
  return res.status(statusCodes.OK).json(result)
})

router.post('/:modelName/', async (req: Request, res: Response) => {
  const {modelName} = req.params
  const Model = getModels()[modelName]
  const result = await Model.create(req.body)
  return res.status(statusCodes.OK).json(result)
})

router.put('/:modelName/:uuid', async (req: Request, res: Response) => {
  const {uuid, modelName} = req.params
  const Model = getModels()[modelName]
  const model = await Model.findByPk(uuid)
  if (!model) throw new PkNotMach(uuid)
  const newModel = await model.update({...req.body})
  return res.status(statusCodes.OK).json(newModel)
})

export default router
