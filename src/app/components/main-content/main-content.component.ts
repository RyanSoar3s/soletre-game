import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  viewChild,
  HostListener

} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { TrimPipe } from '@pipes/trim.pipe';
import { GameLettersConfig } from '@models/game-letter-config.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SafeHtmlPipe

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent  {
  input = viewChild<ElementRef<HTMLInputElement>>("input");

  protected text: string = "";
  protected readonly classList: Array<string> = [];
  private readonly trim = new TrimPipe();
  protected MAX_TEXT_LEN: number = 30;

  gameLetters: GameLettersConfig = {
    letters: [
      { letter: "A", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-1", colStart: "col-start-3" },
      { letter: "B", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-1", colStart: "col-start-5" },
      { letter: "C", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-2", colStart: "col-start-2" },
      { letter: "D", bgColor: "bg-blue-600", textColor: "text-white", rowStart: "row-start-2", colStart: "col-start-4" },
      { letter: "E", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-2", colStart: "col-start-6" },
      { letter: "F", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-3", colStart: "col-start-3" },
      { letter: "G", bgColor: "bg-gray-300", textColor: "text-black", rowStart: "row-start-3", colStart: "col-start-5" }

    ]

  };

  protected readonly faRotate = faRotate;

  @HostListener("document:keydown", [ "$event" ]) activeInput(event: KeyboardEvent): void {
    this.input()?.nativeElement.focus();

    const input = this.input()?.nativeElement;

    if (input) {
      const len = input.value.length
      input.value = this.trim.transform(input.value);

      input.setSelectionRange(len, len);

    }

    this.chooseKeydown(event.key);
  }

  private chooseKeydown(key: string): void {
    switch (key) {
      case "Backspace":
        this.classList.pop();
        break;

      case "Enter":
        this.triggerCheckWordInList();
        break;

      case " ":
        this.triggerShuffleLetters();
        break;

      default:
        this.searchCharInList(key);
        break;

    }

  }

  private searchCharInList(key: string): void {
    let className: string = "l-invalid";

    this.gameLetters.letters.forEach((el, index) => {
      if (el.letter === key.toUpperCase()) {
        if (index === 3) className = "l-central";

        else className = "l-valid";

        return;

      }

    });
    this.classList.push(className);

  }

  triggerAddChar(char: string): void {
    if (this.text.length >= this.MAX_TEXT_LEN) return;
    
    const input = this.input()?.nativeElement;
    if (input) input.value = this.text += char;
    this.searchCharInList(char);

  }

  triggerCheckWordInList(): void {


  }

  triggerShuffleLetters(): void {


  }

  triggerDeleteText(): void {
    const input = this.input()?.nativeElement;
    if (input)
      input.value = this.text = input.value.slice(0, input.value.length - 1);

    this.chooseKeydown("Backspace");

  }

}
