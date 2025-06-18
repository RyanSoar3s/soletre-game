import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@components/home-screen/home-screen.component';
import { GameComponent } from '@components/game/game.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeScreenComponent

  },
  {
    path: "soletre",
    component: GameComponent

  },
  {
    path: "**",
    redirectTo: ""

  }

];
