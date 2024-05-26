import statusCodes from '@config/statusCodes'
import db from '@db'
import {PkNotMach} from '@src/declarations/errors'
import type {Request, Response} from 'express'

export const employeeDetail = async (req: Request, res: Response) => {
  const {uuid} = req.params
  db.relations('Employee')
  const {Employee} = db.getModels()
  const result = await Employee.findByPk(uuid, {
    include: [
      'Supplier',
      'Gender',
      'AcademicLevel',
      'Province',
      'City',
      'Position',
      'Arl',
      'RiskLevel',
      'RiskClass'
    ]
  })
  if (!result) throw new PkNotMach(uuid)
  return res.status(statusCodes.OK).json(result)
}
