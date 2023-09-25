import { Router } from 'express';
import employeeRoute from "./employee.route";

const router = Router();
router.use('/employees', employeeRoute);

export default router;