import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './page/menu/menu.module#MenuPageModule' },
  { path: 'item-detail/:itemid', loadChildren: './page/item-detail/item-detail.module#ItemDetailPageModule' },
  { path: 'item-post', loadChildren: './page/item-post/item-post.module#ItemPostPageModule' },
  { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule'},
  { path: 'listgiveget', loadChildren: './page/listgiveget/listgiveget.module#ListgivegetPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
