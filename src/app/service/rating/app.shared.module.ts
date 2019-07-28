import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { StarRating } from 'ionic4-star-rating';
@NgModule({
  declarations: [ StarRating ],
  exports: [ StarRating ],
  imports: [
    CommonModule, IonicModule
  ]
})
export class SharedModule {}