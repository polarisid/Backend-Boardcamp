import { Router } from "express";
import {getGames,postGames} from '../controllers/gamesController.js'
import {validateGame} from '../middlewares/validateGame.js'
const gamesRouter = Router();

gamesRouter.get('/games',getGames);
gamesRouter.post('/games',validateGame,postGames);
export default gamesRouter;