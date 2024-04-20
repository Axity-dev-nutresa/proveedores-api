import statusCodes from '@config/statusCodes'
import {saveFileS3} from '@src/utils/seveFileS3'
import type {Request, Response} from 'express'
import {Router} from 'express'

export const router = Router()

router.post('/fileS3', async (req: Request, res: Response) => {
  const file = req.file
  const {filePath}: {filePath: string | undefined} = req.body

  if (!file) {
    return res.status(statusCodes.BAD_REQUEST).json({error: 'The file was not found.'})
  }
  if (!filePath) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({error: 'No path found for the file.'})
  }

  const urlS3 = await saveFileS3(file, filePath)

  return res.status(statusCodes.OK).json({urlS3})
})

export default router
