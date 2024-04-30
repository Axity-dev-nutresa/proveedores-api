import {validateModel} from '@src/declarations/middlewares'
import {Router} from 'express'
import crudRoutes from './crud'
import {employeeUuid} from './controllers/employee'

export const router = Router()

router.get('/Employee/:uuid', employeeUuid)
router.use('/:modelName/', validateModel)
router.use('/', crudRoutes)

export default router
