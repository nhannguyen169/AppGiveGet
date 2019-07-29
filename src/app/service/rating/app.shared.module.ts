import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { StarRating } from 'ionic4-star-rating/dist/components/ionic4-star-rating-component';
@NgModule({
  declarations: [ StarRating ],
  exports: [ StarRating ],
  imports: [
    CommonModule, IonicModule
  ]
})
export class SharedModule {}