import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@components/home-screen/home-screen.component';
import { GameComponent } from '@components/game/game.component';
import { WinningModalComponent } from '@components/winning-modal/winning-modal.component';
import { CreditsModalComponent } from '@components/credits-modal/credits-modal.component';
import { HowToPlayModalComponent } from '@components/how-to-play-modal/how-to-play-modal.component';
import { soletreGameDataResolver } from '@resolvers/soletre-game-data.resolver';
import { soletreGameActiveGuard } from '@guards/soletre-game-active.guard';
import { winnerActiveGuard } from '@guards/winner-active.guard';

export const routes: Routes = [
  {
    path: "",
    component: HomeScreenComponent,
    resolve: {
      data: soletreGameDataResolver

    },
    children: [
      {
        path: "creditos",
        component: CreditsModalComponent
      },
      {
        path: "como-jogar",
        component: HowToPlayModalComponent

      },

    ]

  },
  {
    path: "soletre",
    component: GameComponent,
    canActivate: [
      soletreGameActiveGuard

    ],
    children: [
      {
        path: "winner",
        component: WinningModalComponent,
        canActivate: [
          winnerActiveGuard

        ]

      }

    ]

  },
  {
    path: "**",
    redirectTo: ""

  }

];
