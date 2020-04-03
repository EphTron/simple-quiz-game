import express, {Application} from 'express';
import mongoose from 'mongoose';
import config from 'config';
import * as http from "http";
import * as bodyParser from "body-parser";

import morgan from 'morgan';
import cors, {CorsOptions} from 'cors';
import {QuestionController} from "./controllers/question.controller";

// init mongodb connection
mongoose.connect('mongodb://localhost/' + config.get('database.name'),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// create app
const app: Application = express();

// create server and socket
const server: http.Server = http.createServer(app);

// app setting
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// routes
app.use('/get_question', QuestionController);

export {server};
