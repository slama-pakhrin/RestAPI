import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen((8080), () => {
    console.log("Server listening on port 8080")
})

const MONGO_URL = "mongodb+srv://salonlama47:canada0123sCo@restapi.ctqomz7.mongodb.net/?retryWrites=true&w=majority&appName=restAPI"
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());