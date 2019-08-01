import { Component, OnInit } from '@angular/core';
import { SendNotification } from'../../service/notification/send.notification'
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private sendNotification: SendNotification
  ) { }

  ngOnInit() {
  }
  
}
