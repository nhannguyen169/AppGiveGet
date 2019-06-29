import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'item-detail/:itemid', loadChildren: './item-detail/item-detail.module#ItemDetailPageModule' },
  { path: 'item-post', loadChildren: './item-post/item-post.module#ItemPostPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
  { path: 'listgiveget', loadChildren: './listgiveget/listgiveget.module#ListgivegetPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
