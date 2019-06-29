import { Component, OnInit, ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  messages = [
    {
      mess : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      mess : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
      mess : "but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
      mess : "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

  //chuc nang scroll hien toolbar
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 20;
    }
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

}
