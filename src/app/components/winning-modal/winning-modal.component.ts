import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faAt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-winning-modal',
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './winning-modal.component.html',
  styleUrl: './winning-modal.component.css'
})
export class WinningModalComponent {
  protected readonly faXmark = faXmark;
  protected readonly icons: Array<IconDefinition> = [ faGithub, faLinkedin, faWhatsapp, faAt ];
  protected readonly links: Array<string> = [
    "https://github.com/RyanSoar3s",
    "https://www.linkedin.com/in/ryan-s0ares-dev/",
    "https://api.whatsapp.com/send/?phone=5579988004580&text&type=phone_number&app_absent=0",
    "mailto:ryansoares.dev@gmail.com"

  ];

  totalWords = input.required();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  closeModal(): void {
    this.renderer.setStyle(this.el.nativeElement, "display", "none");

  }

}
