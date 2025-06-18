import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  viewChild,
  AfterViewInit,
  AfterContentChecked,
  ChangeDetectionStrategy

} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { CharStyle } from '@models/char-style.model';
import { SoletreGame } from '@models/soletre-game.model';
import { TrimPipe } from '@pipes/trim.pipe';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { RequestApiService } from '@services/request-api.service';
import {
  trigger,
  style,
  transition,
  animate,
  state

} from '@angular/animations';

@Component({
  selector: 'app-game',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ValidateCharPipe,
    SafeHtmlPipe

  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  animations: [
    trigger("textAnimation", [
      state("open", style({ opacity: 1, transform: "translateY(-200px)" })),
      state("close", style({ opacity: 0, transform: "translateY(-260px)" })),
      transition("open => close", [
        animate("1s ease-in-out")

      ])

    ])

  ],

  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GameComponent implements AfterViewInit, AfterContentChecked {
  input = viewChild<ElementRef<HTMLInputElement>>("input");

  private requestApi = inject(RequestApiService);

  protected readonly pathArrowDownImg = "../../../assets/down.png";

  protected message: string = "";
  protected text: string = "";
  protected MAX_TEXT_LEN: number = 30;
  protected soletreGame!: SoletreGame;
  protected charStyles: Array<CharStyle> = [
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-1", colStart: "col-start-3" },
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-1", colStart: "col-start-5" },
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-2", colStart: "col-start-2" },
    { bgColor: "bg-blue-600", textColor: "text-white", rowStart: "row-start-2", colStart: "col-start-4" },
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-2", colStart: "col-start-6" },
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-3", colStart: "col-start-3" },
    { bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-3", colStart: "col-start-5" }

  ];

  protected isAnimate: boolean = false;

  protected readonly wordsFound: Array<string> = [];

  protected totalWordsFound = 0;

  protected readonly faRotate = faRotate;

  protected isOpen: boolean = false;

  private trim = new TrimPipe();
  private validateChar = new ValidateCharPipe();

  ngAfterViewInit(): void {
    this.input()?.nativeElement.disabled;

  }

  ngAfterContentChecked(): void {
    if (this.requestApi.getSoletreGame() && !this.soletreGame) {
      this.soletreGame = this.requestApi.getSoletreGame();
      this.soletreGame.words = this.soletreGame.words.sort();
      const start = this.soletreGame.availableLetters.slice(0, 3);
      const end = this.soletreGame.availableLetters.slice(3);
      this.soletreGame.fullAvailableLetters = start + this.soletreGame.center + end;

    }

  }

  @HostListener("document:keydown", [ "$event" ]) activeInput(event: KeyboardEvent): void {
    const input = this.input()?.nativeElement;

    if (input) {
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
      input.value = this.trim.transform(input.value);

    }

    if (event.code === "Enter") this.triggerCheckWordInList();
    else if (event.code === "Space") this.triggerShuffleLetters();

  }

  triggerAddChar(char: string): void {
    if (this.text.length >= this.MAX_TEXT_LEN) return;

    this.text += char;

  }

  triggerCheckWordInList(): void {
    const text = this.text;

    this.isAnimate = true;
    this.text = "";
    this.message = "Palavra não encontrada";

    if (!text || text.length < 3) {
      this.message = "A palavra deve ter pelo menos 4 letras.";
      return;

    }

    if (!text.includes(this.soletreGame.center)) {
      this.message = "A palavra deve conter a letra central.";
      return;

    }

    else if (Array.from(text).every(char =>
      !this.soletreGame.availableLetters.includes(char) && char !== this.soletreGame.center)) {
      this.message = "A palavra deve conter apenas as letras disponíveis.";
      return;

    }

    const normalizedText = this.validateChar.normalizeString(text);
    const wordFound = this.soletreGame.words.find(el =>
    this.validateChar.normalizeString(el) === normalizedText);

    if (wordFound) {
      if (!this.wordsFound.includes(wordFound)) {
        this.wordsFound.push(wordFound);
        this.wordsFound.sort();
        this.totalWordsFound++;

        if (this.soletreGame.words.length === this.totalWordsFound) {
          this.message = "Parabéns, todas as palavras foram encontradas!";

        }
        else this.message = "Palavra encontrada";

      } else {

        this.message = "Palavra já encontrada";

      }

    }

  }

  triggerShuffleLetters(): void {
    const charList = this.soletreGame.availableLetters.split("");

    for (let i = charList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charList[i], charList[j]] = [charList[j], charList[i]];

    }

    const charString = charList.join("");
    const start = charString.slice(0, 3);
    const end = charString.slice(3);
    this.soletreGame.fullAvailableLetters = start + this.soletreGame.center + end;

  }

  triggerDeleteText(): void {
    this.text = this.text.slice(0, this.text.length - 1);;

  }

}
