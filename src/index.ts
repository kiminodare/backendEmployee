import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'dotenv/config';
import routes from './routes';
import {prisma} from "./utility/prismaUtility";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.all('*', (req, res) => res.status(404).json({error: 'URL not found'}));





const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const listener = () => console.log(`Server is listening on http://${host}:${port}`);
try {
    prisma.$connect();
    app.listen(port, host, listener);
} catch (e) {
    console.error(e);
}