import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './api/wordlist.json' with { type: "json" };
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { RedisClientType } from 'redis';
import { GetDateService } from '@services/get-date.service';
import { inject } from '@angular/core';

const validateCharPipe = new ValidateCharPipe();
const getDataService = inject(GetDateService);

const today = getDataService.getDate();

function createNewSoletreGame(): [ Array<string>, SoletreGame ] {
  const index = Math.floor(Math.random() * wordlist.length);
  const soletreGame = wordlist[index] as Omit<SoletreGame, "date">;


  return [
    soletreGame.words,
    {
      words: [],
      center: soletreGame.center,
      fullAvailableLetters: soletreGame.fullAvailableLetters,
      availableLetters: soletreGame.availableLetters,
      date: today

    }
  ];

}

async function loadSoletreGame(redis: RedisClientType): Promise<[ Array<string>, SoletreGame ]> {
  const [ soletreGameStr, wordsStr ] = await Promise.all([
    redis.get("data:soletre-game"),
    redis.get("data:words")

  ]);

  if (soletreGameStr || wordsStr) {
    let [ words, soletreGame ] = [ JSON.parse(wordsStr!) as Array<string>, JSON.parse(soletreGameStr!) as SoletreGame ];

    if (isUpdate(soletreGame.date)) {
      [ words, soletreGame ] = createNewSoletreGame();
      await saveGame(redis, words, soletreGame);

    }

    return [ words, soletreGame ];

  }

  const [ words, soletreGame ] = createNewSoletreGame();
  await saveGame(redis, words, soletreGame);
  return [ words, soletreGame ];

}


async function saveGame(redis: RedisClientType, words: Array<string>, soletreGame: SoletreGame): Promise<void> {
  await redis.set("data:soletre-game", JSON.stringify(soletreGame));
  await redis.set("data:words", JSON.stringify(words));

}

function isUpdate(date: number): boolean {
  return date !== today;

}

function checkWordInList(word: string, words: Array<string>): { found: boolean, value: string | undefined } {
  const normalized = validateCharPipe.normalizeString(word.toLowerCase());
  const found = words.find(w =>
    validateCharPipe.normalizeString(w) === normalized

  );
  return { found: !!found, value: found };

}

export {
  loadSoletreGame,
  checkWordInList,
  isUpdate

};
