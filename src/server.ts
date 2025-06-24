import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import cors from 'cors'
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';
import { createClient, RedisClientType } from 'redis';
import { loadSoletreGame, checkWordInList, isUpdate } from './api';
import { SoletreGame } from '@models/soletre-game.model';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

export const app = express();
const commonEngine = new CommonEngine();

let client: RedisClientType | null = null;
let game: [ Array<string>, SoletreGame ] | null = null;

const redisClient = async () => {
  if (!client) {
    client = createClient({
      url: process.env["REDIS_URL"] || "redis://127.0.0.1:6379?appendonly=yes&appendfsync=everysec"

    });
    client.on("connect", () => console.log("Redis connected"));
    client.on("error", (error) => console.log(error));
    await client.connect();

  }

  return client;

}

app.use(cors({
  origin: process.env["ORIGIN"] || "http://localhost:4200",
  credentials: true

}));

app.use(express.json());

app.get("/api/wordlist", async (_, res) => {
  try {
    if (!client) {
      client = await redisClient();

    }

    if (!game || isUpdate(game[1].date)) {
      await loadSoletreGame(client).then((data) => game = data);
      return res.json({
        message: "Soletre game started successfully",
        game: game![1]

      });

    }

    return res.json({
      message: "Game already started.",
      game: game![1]

    });

  } catch (err) {
    return res.json({
      message: "An error occurred while loading the soletre game.",
      error: err,
      game: null

    });

  }

});

app.post("/api/wordlist/check-word", (req, res) => {
  const { word } = req.body;
  const wordsInfo = checkWordInList(word, game![0]);

  res.json({
    isValid: wordsInfo.found,
    word: wordsInfo.value ?? ""

  });

});

app.get('/.well-known/*', (_, res) => {
  res.status(204).end();

});

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

export default app;
