import { Injectable } from '@angular/core';
import { SoletreGame } from '@models/soletre-game.model';
import { ValidateWord } from '@models/validate-word.model';
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { getPointWord } from '../../libs/get-points-words';

@Injectable({
  providedIn: 'root'
})
export class ValidateSoletreGameService {
  private validateChar = new ValidateCharPipe();

  validate(text: string, total: number, points: number, maxPoints: number, words: Array<string>, soletreGame: SoletreGame): ValidateWord {
    let message = "Palavra não é válida.";
    let valid = false;
    let word: string | undefined;
    let level = "";

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
      total++;
      const obj = getPointWord(text);
      points += obj.points;
      level = this.getLevel(points, maxPoints);
      message = (obj.pangram) ? "Parabéns, você acho um pangrama" : "Palavra encontrada.";

    }

    return {
      valid,
      word: word ?? "",
      message,
      total,
      level,
      points,

    }

  }

  private getLevel(points: number, maxPoints: number): string {
      const pct = (points / maxPoints) * 100;
      const level = Math.min(Math.floor(pct), 100);

      switch (true) {
        case (level >= 100):
          return 'Mestre';

        case (level >= 70):
          return 'Gênio';

        case (level >= 50):
          return 'Incrível';

        case (level >= 40):
          return 'Excelente';

        case (level >= 25):
          return 'Ótimo';

        case (level >= 15):
          return 'Sólido';

        case (level >= 8):
          return 'Bom';

        case (level >= 5):
          return 'Subindo';

        case (level >= 2):
          return 'Razoável';

        default:
          return 'Iniciante';

      }

  }

}
