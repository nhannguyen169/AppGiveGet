import { Component } from '@angular/core';

import { Platform,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/authentication/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
    
  }
  userEmail:string;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#90EE90');
      this.splashScreen.hide();
    });
    if(this.authService.userDetails()){
      console.log("logged")
    }else{
      this.navCtrl.navigateForward('/login');
    }
  }
}
