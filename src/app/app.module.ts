import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from '../app/service/authentication/authentication.service';
import { FcmService } from '../app/service/notification/fcm.service';
import { SendNotification } from '../app/service/notification/send.notification';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ReactiveFormsModule} from '@angular/forms';
import { ListGiveDetailPageModule } from './modal/list-give-detail/list-give-detail.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,

    ReactiveFormsModule,
    
    //import Firebase and Initialize firebase with environment credentials
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ListGiveDetailPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    AuthService,
    FcmService,
    LocalNotifications,
    SendNotification,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
