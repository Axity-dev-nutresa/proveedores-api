import {validateModel} from '@src/declarations/middlewares'
import {Router} from 'express'
import {employeeDetail} from './controllers/employee'
import {supplierDetail} from './controllers/supplier'
import crudRoutes from './crud'

export const router = Router()

router.get('/Employee/:uuid', employeeDetail)
router.get('/Supplier/:uuid', supplierDetail)
router.use('/:modelName/', validateModel)
router.use('/', crudRoutes)

export default router
