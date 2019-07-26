import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as firebase from 'firebase';
@Injectable()
export class SendNotification {
    constructor(
      private localNotifications : LocalNotifications
    ) {}

    notifyPost(){
     
      this.localNotifications.schedule({
        id: 1,
        text: 'Single ILocalNotification',
        sound: 'file://assets/sounds/notification.mp3',
        data: { secret: 'key_data' }
      });
    }

    
}