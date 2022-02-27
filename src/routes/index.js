import { Router } from "express";
import customersRouter from './customersRouter.js'
import categoriesRouter from './categoriesRouter.js'
const router = Router();
router.use(categoriesRouter)
router.use(customersRouter)
export default router;