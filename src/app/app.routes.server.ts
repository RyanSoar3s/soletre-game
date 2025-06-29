import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Prerender,

  },
  {
    path: "soletre",
    renderMode: RenderMode.Client

  },
  {
    path: "soletre/winner",
    renderMode: RenderMode.Client

  },
  {
    path: "creditos",
    renderMode: RenderMode.Prerender

  },
  {
    path: "como-jogar",
    renderMode: RenderMode.Prerender

  },
  {
    path: "**",
    renderMode: RenderMode.Client

  }

]
