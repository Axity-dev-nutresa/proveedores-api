import {upload} from '@src/utils/multer'
import {Router} from 'express'
import crudRoutes from './crud'
import serviceRoutes from './services'
// import clientRoutes from './routes/client'
// import userRoutes from './routes/user'

export const router = Router()

// router.use('/Client', clientRoutes)
// router.use('/User', userRoutes)

router.use('/service/', upload.single('file'), serviceRoutes)
router.use('/', crudRoutes)

export default router
