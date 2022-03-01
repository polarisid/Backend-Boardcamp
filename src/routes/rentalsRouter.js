import { Router } from "express";
import{postRental} from '../controllers/rentalsController.js';
import { validateRental} from '../middlewares/validateRental.js'
const rentalsRouter = Router();

rentalsRouter.post('/rentals',validateRental,postRental);

export default rentalsRouter;