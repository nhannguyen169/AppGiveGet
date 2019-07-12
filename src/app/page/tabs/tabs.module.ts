import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        { path: 'item-post', loadChildren: '../item-post/item-post.module#ItemPostPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
        { path: 'listgiveget', loadChildren: '../listgiveget/listgiveget.module#ListgivegetPageModule' },
        { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
