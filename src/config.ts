import bodyParser from 'body-parser';
import cors from 'cors';

type Config = {
    port: number,
    urlencoded: bodyParser.OptionsUrlencoded,
    json: bodyParser.OptionsJson,
    cors: cors.CorsOptions
};

export const config: Config = {
    port: Number(process.env.PORT ?? 3000),

    urlencoded: {
        limit: '100mb',
        extended: true
    },

    json: {
        limit: '100mb'
    },

    cors: {
        origin: 'https://hadaward.github.io',
        credentials: true
    }
};