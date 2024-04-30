import statusCodes from '@config/statusCodes'
import {getModels} from '@db'
import {resPkNotMach} from '@src/declarations/functions'
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

router.get('/:modelName/:uuid/', async (req: Request, res: Response) => {
  const {uuid, modelName} = req.params
  const Model = getModels()[modelName]
  const result = await Model.findByPk(uuid)
  if (!result) return resPkNotMach(res, uuid)
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
  if (!model) return resPkNotMach(res, uuid)
  const newModel = await model.update({...req.body})
  return res.status(statusCodes.OK).json(newModel)
})

router.delete('/:modelName/:uuid', async (req: Request, res: Response) => {
  const {uuid, modelName} = req.params
  const Model = getModels()[modelName]
  const model = await Model.findByPk(parseInt(uuid, 10))
  if (!model) return resPkNotMach(res, uuid)
  const newModel = await model.destroy()
  return res.status(statusCodes.OK).json(newModel)
})

export default router
