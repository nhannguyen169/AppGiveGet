import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListGiveDetailPage } from './list-give-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ListGiveDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListGiveDetailPage]
})
export class ListGiveDetailPageModule {}
