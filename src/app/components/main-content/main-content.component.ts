import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  viewChild

} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameLettersConfig } from '@models/game-letter-config.model';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    FormsModule

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  input = viewChild<ElementRef<HTMLInputElement>>("input");

  protected text: string = "";
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

  activeInput(): void {
    this.input()?.nativeElement.focus();

  }

}
