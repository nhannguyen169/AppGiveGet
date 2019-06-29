import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.page.html',
  styleUrls: ['./item-post.page.scss'],
})
export class ItemPostPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 20;
    }
  }
}
