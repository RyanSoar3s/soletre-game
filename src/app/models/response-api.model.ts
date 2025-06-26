import { SoletreGame } from "./soletre-game.model";

export type ResponseApi = {
  message: string,
  token: string,
  game: SoletreGame | null,
  key: string,
  error?: unknown

}
