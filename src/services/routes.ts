import statusCodes from '@config/statusCodes'
import {PropertyInvalid} from '@src/declarations/errors'
import {saveFileS3} from '@src/utils/saveFileS3'
import type {Request, Response} from 'express'
import {Router} from 'express'

export const router = Router()

router.post('/fileS3', async (req: Request, res: Response) => {
  const file = req.file
  const {filePath}: {filePath: string | undefined} = req.body
  if (!file) throw new PropertyInvalid('file')
  if (!filePath) throw new PropertyInvalid('filePath')
  const urlS3 = await saveFileS3(file, filePath)
  return res.status(statusCodes.OK).json({urlS3})
})

export default router
