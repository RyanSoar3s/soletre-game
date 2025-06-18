import {
  Component,
  inject,
  OnInit

} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { RequestApiService } from '@services/request-api.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'soletre';

  private requestApiService = inject(RequestApiService);

  ngOnInit(): void {
    this.requestApiService.requestApi();

  }

}
