import { Component, OnInit } from '@angular/core';
import { RouterEvent, Router } from '@angular/router';
import { AuthService } from '../../service/authentication/authentication.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pages = [
    {
      title: 'Trang chủ',
      url:'/menu/home',
      icon:'home'
    },
    {
      title: 'About',
      url:'/menu/about',
      icon:'information-circle-outline'
    }
  ]

  selectedPath = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }
   //dang xuat
   logOut(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/login');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
