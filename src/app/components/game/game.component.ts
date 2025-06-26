import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  viewChild,
  AfterViewInit,
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef

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
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGameService } from '@services/soletre-game.service';
import {
  trigger,
  style,
  transition,
  animate,
  state

} from '@angular/animations';
import { firstValueFrom } from 'rxjs';

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

  private requestApiService = inject(RequestApiService);
  private localStorageService = inject(LocalStorageService);
  private soletreGameService = inject(SoletreGameService);

  protected readonly pathArrowDownImg = "assets/down.png";

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

  protected totalWordsFound!: number;

  protected readonly faRotate = faRotate;

  protected isOpen: boolean = false;

  private trim = new TrimPipe();
  private validateChar = new ValidateCharPipe();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.input()?.nativeElement.disabled;

  }

  ngAfterContentChecked(): void {
    const isGameExist = this.localStorageService.getItem("SoletreGame");

    if (isGameExist && !this.soletreGame) {
      this.soletreGame = this.soletreGameService.getSoletreGame("SoletreGame");
      const letters = [ ...this.soletreGame.availableLetters ];
      letters.splice(3, 0, this.soletreGame.center);
      this.soletreGame.fullAvailableLetters = letters;
      this.totalWordsFound = this.soletreGame.words.length;

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

  async triggerCheckWordInList(): Promise<void> {
    const text = this.validateChar.normalizeString(this.text);

    this.isAnimate = true;
    this.text = "";

    if (text.length < 4) {
      this.message = "A palavra deve ter pelo menos 4 letras.";
      return;

    }
    const centerChar = this.validateChar.normalizeString(this.soletreGame.center);

    if (!text.includes(centerChar)) {
      this.message = "A palavra deve conter a letra central.";
      return;

    }

    if (Array.from(text).some(char => {
      const normalizedChar = this.validateChar.normalizeString(char);
      return !this.soletreGame.availableLetters.includes(normalizedChar) && normalizedChar !== centerChar;

    })) {
      this.message = "A palavra deve conter apenas as letras disponíveis.";
      return;

    }

    try {
      this.isAnimate = false;
      const data = await firstValueFrom(this.requestApiService.requestCheckWordApi(text)); console.log(data.words)

      if (!data.isValid) {
        this.message = "Palavra não encontrada.";

      }
      else if (this.soletreGame.words.find((w) => this.validateChar.normalizeString(w) === text)) {
        this.message = "Palavra já encontrada!";

      }
      else {
        this.message = "Palavra encontrada!";
        this.soletreGame.words.push(data.word as string);
        this.soletreGame.words.sort();

        const soletreGameStringify = this.soletreGameService.formatSoletreGameValue(this.soletreGame)
        this.localStorageService.updateItem("SoletreGame", soletreGameStringify);
        this.totalWordsFound++;

      }
      this.isAnimate = true;
      this.cdr.detectChanges();

    }
    catch {
      this.message = "Erro ao verificar a palavra.";
      return;

    }

  }

  triggerShuffleLetters(): void {
    let charList = [ ...this.soletreGame.availableLetters as Array<string> ];

    for (let i = charList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charList[i], charList[j]] = [charList[j], charList[i]];

    }

    charList.splice(3, 0, this.soletreGame.center);
    this.soletreGame.fullAvailableLetters = charList;

    const soletreGameStringify = this.soletreGameService.formatSoletreGameValue(this.soletreGame)
    this.localStorageService.updateItem("SoletreGame", soletreGameStringify);

  }

  triggerDeleteText(): void {
    this.text = this.text.slice(0, this.text.length - 1);;

  }

}
