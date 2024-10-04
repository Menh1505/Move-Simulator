import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import Routes from './routes/Routes';
import { SolDir, moveDir } from './config/multerConfig';
import fs from 'fs';
import cors from 'cors';
require('dotenv').config();

const app = express();
if (!fs.existsSync(SolDir)) {
    fs.mkdirSync(SolDir);
}
if (!fs.existsSync(moveDir)) {
    fs.mkdirSync(moveDir);
}
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(Routes);
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});