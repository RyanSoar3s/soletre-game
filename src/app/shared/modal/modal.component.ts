import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  input,
  viewChild,
  Renderer2

} from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  protected readonly faXmark = faXmark;

  modal = viewChild<ElementRef<HTMLElement>>("modal");

  height = input.required<string>();
  width = input.required<string>();

  closePath = input<string>("/");

  constructor(
    private renderer: Renderer2,
    private route: Router

  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.modal()?.nativeElement, "height",this.height());
    this.renderer.setStyle(this.modal()?.nativeElement, "width", this.width());

  }

  closeModal(): void {
    const navArray = this.closePath()?.split("/").splice(0, 1, "/");
    this.route.navigate(navArray!);

  }
}
