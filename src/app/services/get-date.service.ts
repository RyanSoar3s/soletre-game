import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDateService {
  private now = new Date();
  private today = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit"

  }).format(this.now);

  getDate(): number {
    return +this.today;

  }

}
