import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './api/wordlist.json' with { type: "json" };
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { RedisClientType } from 'redis';

let words: Array<string> = [];
const validateCharPipe = new ValidateCharPipe();

function createNewSoletreGame(): SoletreGame {
  const today = new Date().getDate();
  const index = Math.floor(Math.random() * wordlist.length);
  const soletreGame = wordlist[index] as SoletreGame;

  words.push(...soletreGame.words);

  return {
    words: [],
    center: soletreGame.center,
    fullAvailableLetters: soletreGame.fullAvailableLetters,
    availableLetters: soletreGame.availableLetters,
    date: today

  };

}

async function loadSoletreGame(redis: RedisClientType): Promise<SoletreGame> {
  const [ soletreGameStr, wordsStr ] = await Promise.all([
    redis.get("data:soletre-game"),
    redis.get("data:words")

  ]);

  if (soletreGameStr || wordsStr) {
    let soletreGame = JSON.parse(soletreGameStr!) as SoletreGame;

    if (soletreGame.date !== new Date().getDate()) {
      soletreGame = createNewSoletreGame();
      await saveSoletreGame(redis, soletreGame);

    }

    return soletreGame;

  }

  const newSoletreGame = createNewSoletreGame();
  await saveSoletreGame(redis, newSoletreGame);
  return newSoletreGame;

}

async function saveSoletreGame(redis: RedisClientType, game: SoletreGame): Promise<void> {
  await redis.set("data:soletre-game", JSON.stringify(game));
  await redis.set("data:words", JSON.stringify(words));

}

function checkWordInList(word: string): { found: boolean, value: string | undefined } {
  const normalized = validateCharPipe.normalizeString(word.toLowerCase());
  const found = words.find(w =>
    validateCharPipe.normalizeString(w) === normalized

  );
  return { found: !!found, value: found };

}

export {
  loadSoletreGame,
  checkWordInList

};
