import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'item-detail/:itemid', loadChildren: './page/item-detail/item-detail.module#ItemDetailPageModule' },
  { path: 'about', loadChildren: './page/about/about.module#AboutPageModule'},
  { path: 'tabs', loadChildren: './page/tabs/tabs.module#TabsPageModule' },
  { path: 'category-detail/:categoryName', loadChildren: './page/category/detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
