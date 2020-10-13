import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'starships',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/components/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/login/components/register/register.module').then(x => x.RegisterModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'starships',
        loadChildren: () => import('./pages/ships/components/list-ships.module').then(x => x.ListShipsModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about/about.module').then(x => x.AboutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
