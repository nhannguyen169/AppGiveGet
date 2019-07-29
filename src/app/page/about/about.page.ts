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
  
  demo(){
    var str = "https://firebasestorage.googleapis.com/v0/b/appgiveget.appspot.com/o/ProductImage%2F1563164918.jpg?alt=media";
    var str2 =str.substr(84,10);
    console.log(str2);
  }
}
