import express from 'express'
const router = express.Router()
import * as StudentController from '../controllers/studentControllers.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { uploadFile , ReadFile, deleteFile} from './../controllers/FileUploadController.js';



router.post('/Registration', StudentController.Registration)
router.post('/Login', StudentController.Login)
router.get('/ReadProfile', AuthMiddleware,StudentController.ReadProfile)
router.post('/UpdateProfile', AuthMiddleware,StudentController.UpdateProfile)

router.post('/uploadFile', uploadFile)
router.get('/readFile/:filename', ReadFile)
router.post('/deleteFile/:filename', deleteFile)


export default router;