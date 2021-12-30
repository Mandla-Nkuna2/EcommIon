import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'cart-modal',
    loadChildren: () =>
      import('./cart-modal/cart-modal.module').then(
        (m) => m.CartModalPageModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
    // canActivate: [AutoLoginGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
