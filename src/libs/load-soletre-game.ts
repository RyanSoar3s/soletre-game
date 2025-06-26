import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './wordlist.json' with { type: "json" };
import { RedisClientType } from 'redis';
import { encrypt } from './crypto';
import getDate from './get-current-date';

function createNewSoletreGame(): [ Array<string>, game: SoletreGame ] {
  const index = Math.floor(Math.random() * wordlist.length);
  const soletreGame = wordlist[index] as Omit<SoletreGame, "date">;

  return [
    soletreGame.words,
    {
      words: [],
      center: soletreGame.center,
      fullAvailableLetters: soletreGame.fullAvailableLetters,
      availableLetters: soletreGame.availableLetters,
      date: getDate(),
      total: soletreGame.words.length
    }

  ];

}

async function loadSoletreGame(redis: RedisClientType): Promise<{ token: string, game: SoletreGame }> {
  const [ soletreGameStr, wordsStr ] = await Promise.all([
    redis.get("data:soletre-game"),
    redis.get("data:words")

  ]);

  if (soletreGameStr) {
    let [ words, soletreGame ] = [ JSON.parse(wordsStr!) as Array<string>, JSON.parse(soletreGameStr!) as SoletreGame ];

    if (isUpdate(soletreGame.date)) {
      [ words, soletreGame ] = createNewSoletreGame();
      await saveGame(redis, words, soletreGame);

    }

    const token = encrypt(JSON.stringify(words), process.env["CLIENT_SECRET_KEY"] || "myKey");
    return { token: token, game: soletreGame };

  }

  const  [ words, soletreGame ] = createNewSoletreGame();
  await saveGame(redis, words, soletreGame);

  const token = encrypt(JSON.stringify(words), process.env["CLIENT_SECRET_KEY"] || "myKey");

  return { token: token, game: soletreGame };

}

async function saveGame(redis: RedisClientType, words: Array<string>, soletreGame: SoletreGame): Promise<void> {
  await redis.set("data:soletre-game", JSON.stringify(soletreGame));
  await redis.set("data:words", JSON.stringify(words));

}

function isUpdate(date: number): boolean {
  return date !== getDate();

}

export default loadSoletreGame;
