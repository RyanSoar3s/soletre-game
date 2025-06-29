import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';

@Component({
  selector: 'app-credits-modal',
  imports: [
    CommonModule,
    ModalComponent

  ],
  templateUrl: './credits-modal.component.html',
  styleUrl: './credits-modal.component.css'
})
export class CreditsModalComponent {
  protected readonly pathLogo = "favicon.png";

}
