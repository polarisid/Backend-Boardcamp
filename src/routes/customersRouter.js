import { Router } from "express";
import { getCustomers,postCustomers,putCustomers } from "../controllers/customerController.js";
import { validateCustomer } from "../middlewares/validateCustomer.js";
const customersRouter =Router();

customersRouter.get('/customers/:id',getCustomers)
customersRouter.get('/customers/',getCustomers)
customersRouter.post('/customers',validateCustomer,postCustomers)
customersRouter.put('/customers/:id',validateCustomer,putCustomers)
export default customersRouter;