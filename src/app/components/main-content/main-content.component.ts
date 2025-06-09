import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  viewChild,
  HostListener,
  AfterViewInit

} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { GameLettersConfig } from '@models/game-letter-config.model';
import { ValidateCharPipe } from '@pipes/validate-char.pipe';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ValidateCharPipe,
    SafeHtmlPipe

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements AfterViewInit {
  input = viewChild<ElementRef<HTMLInputElement>>("input");

  protected text: string = "";
  protected MAX_TEXT_LEN: number = 30;
  protected chars = [ "A", "B", "C", "D", "E", "F", "G" ];

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

  ngAfterViewInit(): void {
    this.input()?.nativeElement.focus();

  }

  @HostListener("document:keydown") activeInput(): void {
    const input = this.input()?.nativeElement;

    if (input) {
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);

    }

  }

  triggerAddChar(char: string): void {
    if (this.text.length >= this.MAX_TEXT_LEN) return;

    this.text += char;

  }

  triggerCheckWordInList(): void {


  }

  triggerShuffleLetters(): void {


  }

  triggerDeleteText(): void {
    this.text = this.text.slice(0, this.text.length - 1);

  }

}
