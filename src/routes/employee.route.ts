import { Router } from 'express';
import * as controller from '../controller/employee';


const router = Router();
router.get('/generate', controller.generateEmployeeId);
router.get('/remove', controller.removeEmployee);
router.get('/:id', controller.getEmployeeById);
router.get('/', controller.getEmployee);


export default router;
