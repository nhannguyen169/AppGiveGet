import { Component,NgZone  } from '@angular/core';

import { Platform,NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    private ngZone : NgZone
  ) {
    this.initializeApp();
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#90EE90');
      this.splashScreen.hide();
      const navctrl =  this.navCtrl;
      const ngzone = this.ngZone;
      firebase.auth().onAuthStateChanged(function(user){      
        if(user == null){
          ngzone.run(() =>  navctrl.navigateRoot('/login').then());
        }else{
          ngzone.run(() =>  navctrl.navigateRoot('/tabs/menu').then());
        }
      })
    });
  }
}