import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import PhotoRouter from "./photos/photo.routes";

const cors = require('cors');
const credentials = {
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(credentials));
app.use(express.json());


app.post('/photos', PhotoRouter);
app.get('/photos', PhotoRouter);
app.get('/photos/:id', PhotoRouter);
app.delete('/photos/:id', PhotoRouter);
app.put('/photos/:id', PhotoRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
