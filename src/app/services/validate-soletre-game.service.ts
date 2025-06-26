import { Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';
import { ValidateWord } from '@models/validate-word.model';
import { ValidateCharPipe } from '@pipes/validate-char.pipe';


@Injectable({
  providedIn: 'root'
})
export class ValidateSoletreGameService {
  private validateChar = new ValidateCharPipe();

  validate(text: string, total: number, words: Array<string>, soletreGame: SoletreGame): ValidateWord {
    let message = "Palavra não é válida.";
    let valid = false;
    let word: string | undefined;

    text = this.validateChar.normalizeString(text);

    const centerChar = this.validateChar.normalizeString(soletreGame.center);

    if (text.length < 4) {
      message = "A palavra deve ter pelo menos 4 letras.";

    }

    else if (!text.includes(centerChar)) {
      message = "A palavra deve conter a letra central.";

    }

    else if (Array.from(text).some((char) => {
      const normalizedChar = this.validateChar.normalizeString(char);
      return !soletreGame.availableLetters.includes(normalizedChar) && normalizedChar !== centerChar;

    })) {
      message = "A palavra deve conter apenas as letras disponíveis.";

    }

    else if (soletreGame.words.some((w) => this.validateChar.normalizeString(w) === text)) {
      message = "Palavra já encontrada!";

    }

    else if (word = words.find((w) => this.validateChar.normalizeString(w) === text)) {
      valid = true;
      message = "Palavra encontrada.";
      total++;

    }

    return {
      valid,
      word: word ?? "",
      message,
      total

    }

  }

}
