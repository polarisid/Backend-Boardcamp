import { Router } from "express";
import { getCustomers } from "../controllers/customerController.js";
const customersRouter =Router();

customersRouter.get('/customers/:id',getCustomers)
customersRouter.get('/customers/',getCustomers)
export default customersRouter;