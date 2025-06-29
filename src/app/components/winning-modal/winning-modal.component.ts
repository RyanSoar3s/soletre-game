import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { ModalComponent } from '@shared/modal/modal.component';
import { SoletreGameService } from '@services/soletre-game.service';

@Component({
  selector: 'app-winning-modal',
  imports: [
    FontAwesomeModule,
    CommonModule,
    ModalComponent
  ],
  templateUrl: './winning-modal.component.html',
  styleUrl: './winning-modal.component.css'
})
export class WinningModalComponent implements OnInit {
  protected readonly icons: Array<IconDefinition> = [ faGithub, faLinkedin, faWhatsapp, faAt ];
  protected readonly links: Array<string> = [
    "https://github.com/RyanSoar3s",
    "https://www.linkedin.com/in/ryan-s0ares-dev/",
    "https://api.whatsapp.com/send/?phone=5579988004580&text&type=phone_number&app_absent=0",
    "mailto:ryansoares.dev@gmail.com"

  ];

  private soletreGameService = inject(SoletreGameService);

  totalWords = signal<number>(0);

  ngOnInit(): void {
    const soletreGame = this.soletreGameService.getSoletreGame("@soletre/game");
    this.totalWords.set(soletreGame.total);

  }

}
