import statusCodes from '@config/statusCodes'
import {getModels} from '@db'
import {relations} from '@src/database/relations'
import {resPkNotMach} from '@src/declarations/functions'
import type {Request, Response} from 'express'

export const supplierDetail = async (req: Request, res: Response) => {
  const {uuid} = req.params
  relations()
  const {Supplier} = getModels()
  const result = await Supplier.findByPk(uuid, {
    include: ['Business', 'Company', 'Regional', 'Location', 'CompanyType', 'Service']
  })
  if (!result) return resPkNotMach(res, uuid)
  return res.status(statusCodes.OK).json(result)
}
