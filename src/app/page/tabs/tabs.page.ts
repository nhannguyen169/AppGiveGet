import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  userID: any;
  ngOnInit() {
  }

  ionViewDidEnter(){
    //lay thong tin user dang su dung app
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
  }
}
