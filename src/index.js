import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from './routes/index.js';
dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors())
app.use(json());
app.use(router)
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });