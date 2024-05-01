import statusCodes from '@src/config/statusCodes'
import type {Response} from 'express'

export const resPkNotMach = (res: Response, pk: string | number) => {
  res.status(statusCodes.BAD_REQUEST).json({
    status: statusCodes.BAD_REQUEST,
    message: `No se encontro registro para pk: '${pk}'`
  })
}
