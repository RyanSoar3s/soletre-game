import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './api/wordlist.json' with { type: "json" };
import { ValidateCharPipe } from '@pipes/validate-char.pipe';

let soletreGameData!: SoletreGame;
let words: Array<string> = [];
let isReset = false;
const validateCharPipe = new ValidateCharPipe();

function generateSoletreGame(): void {
  const date = new Date().getDate();
  const index: number = Math.floor(Math.random() * wordlist.length % wordlist.length);
  const wordlistInfo = wordlist[index] as SoletreGame;
  words = wordlistInfo.words;

  soletreGameData = {
    words: [],
    center: wordlistInfo.center,
    fullAvailableLetters: wordlistInfo.fullAvailableLetters,
    availableLetters: wordlistInfo.availableLetters,
    date: date

  };

}

function getSoletreGame(data: string | null | undefined = undefined, wordsArray: string | null | undefined = undefined): SoletreGame {
  if (data) {
    const game = JSON.parse(data) as SoletreGame;

    if (game.date !== new Date().getDate()) {
      generateSoletreGame()
      isReset = true;

    }

    else {
      soletreGameData = game;
      words.push(...JSON.parse(wordsArray!));
      isReset = false;

    }

  }

  else if (!soletreGameData || soletreGameData.date !== new Date().getDate()) {
    generateSoletreGame();
    isReset = true;

  }
  return soletreGameData;

}

function checkWordInList(word: string): [ boolean, string | undefined ] {
  const normalizedWord = validateCharPipe.normalizeString(word.toLowerCase());
  const res = words.find((w) => validateCharPipe.normalizeString(w) === normalizedWord);
  return [ !!res, res ];

}

export {
  isReset,
  words,
  getSoletreGame,
  checkWordInList

};
