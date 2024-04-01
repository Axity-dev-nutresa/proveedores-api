import statusCodes from '@config/statusCodes'
import {saveFileS3} from '@src/utils/seveFileS3'
import type {Request, Response} from 'express'
import {Router} from 'express'

export const router = Router()

router.post('/fileS3', async (req: Request, res: Response) => {
  const file = req.file
  const {filePath}: {filePath: string | undefined} = req.body

  if (!file) return res.status(400).json({error: 'No se encontro el archivo.'})
  if (!filePath)
    return res.status(400).json({error: 'No se encontro path para el archivo.'})

  const urlS3 = await saveFileS3(file, `supplier-api/${filePath}`)

  return res.status(statusCodes.OK).json({urlS3})
})

export default router
