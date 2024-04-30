import statusCodes from '@config/statusCodes'
import {getModels} from '@db'
import {relations} from '@src/database/relations'
import {resPkNotMach} from '@src/declarations/functions'
import type {Request, Response} from 'express'

export const employeeUuid = async (req: Request, res: Response) => {
  const {uuid} = req.params
  relations()
  const {Employee} = getModels()
  const result = await Employee.findByPk(uuid, {
    include: [
      'Gender',
      'AcademicLevel',
      'Province',
      'City',
      'Arl',
      'RiskLevel',
      'RiskClass'
    ]
  })
  if (!result) return resPkNotMach(res, uuid)
  return res.status(statusCodes.OK).json(result)
}
