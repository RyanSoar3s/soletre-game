import wordlist from './api/wordlist.json' with { type: "json" };
import { SoletreGame } from '@models/soletre-game.model';

function getSoletreGame(): SoletreGame {
  const index: number = Math.floor(Math.random() * wordlist.length % wordlist.length);
  return wordlist[index];

}

export default getSoletreGame;
