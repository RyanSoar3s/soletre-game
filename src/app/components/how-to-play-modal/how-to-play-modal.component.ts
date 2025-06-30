import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-how-to-play-modal',
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalComponent

  ],
  templateUrl: './how-to-play-modal.component.html',
  styleUrl: './how-to-play-modal.component.css'
})
export class HowToPlayModalComponent {
  protected readonly faQuestion = faQuestion;
  protected readonly rules = [
    "Toda palavra deve possuir no mínimo 4 letras.",
    "Toda palavra deve possuir a letra central.",
    "Não é permitido: palavras com hífen, pronomes, preposições e palavrões.",
    "Não é permitido palavras com plural. EX.: CARROS, MOEDAS...",
    "É permitido verbos no infinitivo. EX.: JOGAR, COMER, VESTIR...",
    "É permitido palavras no masculino e/ou feminino. EX.: MOÇO e MOÇA.",
    "Nem todas as palavras que é possível formar estão na lista do jogo.",
    "Palavras de 4 letras valem 1 ponto cada.",
    "Palavras mais longas ganham 1 ponto por letra.",
    "Cada jogo inclui pelo menos um 'pangrama', que usa todas as letras. Eles valem 7 pontos extras!"

  ];

}
