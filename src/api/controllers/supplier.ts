import statusCodes from '@config/statusCodes'
import db from '@db'
import {PkNotMach} from '@src/declarations/errors'
import type {Request, Response} from 'express'

export const supplierDetail = async (req: Request, res: Response) => {
  const {uuid} = req.params
  db.relations('Supplier')
  const {Supplier} = db.getModels()
  const result = await Supplier.findByPk(uuid, {
    include: ['Business', 'Company', 'Regional', 'Location', 'CompanyType', 'Service']
  })
  if (!result) throw new PkNotMach(uuid)
  return res.status(statusCodes.OK).json(result)
}
