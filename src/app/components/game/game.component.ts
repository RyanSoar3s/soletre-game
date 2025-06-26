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
import { WinningModalComponent } from '@components/winning-modal/winning-modal.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { CharStyle } from '@models/char-style.model';
import { SoletreGame } from '@models/soletre-game.model';
import { TrimPipe } from '@pipes/trim.pipe';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { LocalStorageService } from '@services/local-storage.service';
import { SoletreGameService } from '@services/soletre-game.service';
import { ValidateSoletreGameService } from '@services/validate-soletre-game.service';
import {
  trigger,
  style,
  transition,
  animate,
  state

} from '@angular/animations';
import { decrypt } from '../../../libs/crypto';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-game',
  imports: [
    CommonModule,
    WinningModalComponent,
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

  private localStorageService = inject(LocalStorageService);
  private soletreGameService = inject(SoletreGameService);
  private validateSoletreGameService = inject(ValidateSoletreGameService);

  protected readonly pathArrowDownImg = "assets/down.png";

  protected message: string = "";
  protected text: string = "";
  protected MAX_TEXT_LEN: number = 30;
  protected soletreGame!: SoletreGame;
  words!: Array<string>;

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
  protected isWinner: boolean = false;

  private trim = new TrimPipe();

  ngAfterViewInit(): void {
    this.input()?.nativeElement.disabled;

  }

  ngAfterContentChecked(): void {
    const isGameExist = this.localStorageService.hasItem("@soletre/game");

    if (isGameExist && !this.soletreGame) {
      this.soletreGame = this.soletreGameService.getSoletreGame("@soletre/game");

      const letters = [ ...this.soletreGame.availableLetters ];

      const wordsStr = this.localStorageService.getItem("soletre_game_token");
      const decryptData = decrypt(wordsStr!, environment.CLIENT_SECRET_KEY);
      this.words = JSON.parse(decryptData);

      letters.splice(3, 0, this.soletreGame.center);
      this.soletreGame.fullAvailableLetters = letters;
      this.totalWordsFound = this.soletreGame.words.length;

    }

  }

  @HostListener("document:keydown", [ "$event" ]) activeInput(event: KeyboardEvent): void {
    if (this.isWinner) return;

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
    if (this.text.length >= this.MAX_TEXT_LEN || this.isWinner) return;

    this.text += char;

  }

  triggerCheckWordInList(): void {
    const info = this.validateSoletreGameService.validate(this.text, this.totalWordsFound, this.words, this.soletreGame);

    if (info.valid) {
      this.soletreGame.words.push(info.word);
      const value = this.soletreGameService.formatSoletreGameValue(this.soletreGame);
      this.localStorageService.updateItem("@soletre/game", value);

    }

    this.message = info.message;
    this.totalWordsFound = info.total;
    this.isAnimate = true;
    this.text = "";

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
    this.text = this.text.slice(0, this.text.length - 1); console.log(this.words)

  }

}
