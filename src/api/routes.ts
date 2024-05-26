import {validateModel} from '@src/declarations/middlewares'
import {Router} from 'express'
import crudRoutes from './crud'

export const router = Router()

router.use('/:modelName/', validateModel)
router.use('/', crudRoutes)

export default router
