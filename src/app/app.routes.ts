import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@components/home-screen/home-screen.component';
import { GameComponent } from '@components/game/game.component';
import { soletreGameDataResolver } from '@resolvers/soletre-game-data.resolver';
import { canActiveRouteGuard } from '@guards/can-active-route.guard';

export const routes: Routes = [
  {
    path: "",
    component: HomeScreenComponent,
    resolve: {
      data: soletreGameDataResolver

    }

  },
  {
    path: "soletre",
    component: GameComponent,
    resolve: {
      data: soletreGameDataResolver

    },
    canActivate: [
      canActiveRouteGuard

    ]

  },
  {
    path: "**",
    redirectTo: ""

  }

];
