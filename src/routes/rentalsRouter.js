import { Router } from "express";
import{postRental,getRental,finishRental,deleteRental} from '../controllers/rentalsController.js';
import { validateRental} from '../middlewares/validateRental.js'
const rentalsRouter = Router();

rentalsRouter.post('/rentals',validateRental,postRental);
rentalsRouter.get('/rentals',getRental);
rentalsRouter.post('/rentals/:id/return',finishRental)
rentalsRouter.delete('/rentals/:id',deleteRental)
export default rentalsRouter;