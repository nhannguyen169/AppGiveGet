import { Component,NgZone,ViewChild   } from '@angular/core';
import { Platform,NavController} from '@ionic/angular';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from '../app/service/notification/fcm.service';
import { SendNotification } from '../app/service/notification//send.notification';
import { ItemDetailPage} from '../app/page/item-detail/item-detail.page'
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(NavController) navChild:NavController;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    private fcmService : FcmService,
    private sendNotification : SendNotification,
    public deeplinks: Deeplinks,
    private ngZone : NgZone
  ) {
    this.initializeApp();
  }
  checkUserLogin(){
    const navctrl =  this.navCtrl;
    const ngzone = this.ngZone;
    firebase.auth().onAuthStateChanged(function(user){      
      if(user == null || user.emailVerified != true){
        ngzone.run(() =>  navctrl.navigateRoot('/login').then());
      }else{
        ngzone.run(() =>  navctrl.navigateRoot('/tabs/menu').then());
      }
    })
  }

  getNotification(){
    this.platform.ready().then(() => {

      // Get a FCM token
      this.fcmService.getToken()

      // Listen to incoming messages
      this.fcmService.listenToNotifications().subscribe()

    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#90EE90');
      this.splashScreen.hide();
      this.checkUserLogin();
      this.getNotification();
      this.sendNotification.getNotification();
      this.deeplinks.routeWithNavController(this.navChild, {
        'item-detail/:itemId': ItemDetailPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
      });
    });
  }
}