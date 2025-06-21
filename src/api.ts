import { SoletreGame } from '@models/soletre-game.model';
import wordlist from './api/wordlist.json' with { type: "json" };
import { ValidateCharPipe } from '@pipes/validate-char.pipe';

let soletreGameData!: SoletreGame;
let words: Array<string> = [];
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

function getSoletreGame(): SoletreGame {
  if (!soletreGameData || soletreGameData.date !== new Date().getDate()) {
    generateSoletreGame();

  }
  return soletreGameData;

}

function checkWordInList(word: string): [ boolean, string | undefined ] {
  const normalizedWord = validateCharPipe.normalizeString(word.toLowerCase());
  const res = words.find((w) => validateCharPipe.normalizeString(w) === normalizedWord);
  return [ !!res, res ];

}

export {
  getSoletreGame,
  checkWordInList

};
