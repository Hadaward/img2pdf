import express from 'express';
import cors from 'cors';

import { config } from './config';
import { UploadRouter } from './routes/upload';

const app = express();

// Setup middle-wares
app.use(cors(config.cors));
app.use(express.json(config.json));
app.use(express.urlencoded(config.urlencoded));

// Setup routes
app.all("*", (_, __, next) => next());
app.use("/upload", UploadRouter);
app.use("/", (_, res) => {
    res.send("Ping Pong!");
});

app.listen(config.port, () => console.log(`App running on port ${config.port}`));