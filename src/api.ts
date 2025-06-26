import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './api/wordlist.json' with { type: "json" };
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { RedisClientType } from 'redis';

const validateCharPipe = new ValidateCharPipe();

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
      date: getDate()

    }
  ];

<<<<<<< HEAD
  };

=======
>>>>>>> main-content
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

<<<<<<< HEAD
function checkWordInList(word: string): { found: boolean, value: string | undefined, words: string[] } {
=======
function getDate(): number {
  const now = new Date();
  const today = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit"

  }).format(now);

  return +today;

}

function isUpdate(date: number): boolean {
  return date !== getDate();

}

function checkWordInList(word: string, words: Array<string>): { found: boolean, value: string | undefined } {
>>>>>>> main-content
  const normalized = validateCharPipe.normalizeString(word.toLowerCase());
  const found = words.find(w =>
    validateCharPipe.normalizeString(w) === normalized

  );
  return { found: !!found, value: found, words };

}

export {
  loadSoletreGame,
  checkWordInList,
  isUpdate

};
