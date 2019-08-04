import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable()
export class SendNotification {
    constructor(
      private localNotifications : LocalNotifications,
      private afs: AngularFirestore
    ) {}

    mess : any;
    messageRef: any;  

    readMessage(){
      this.messageRef =  this.afs.collection('message', ref => ref.orderBy('ngaytao', 'desc'));
      return this.messageRef.snapshotChanges();
    }
    getNotification(){
      this.messageRef =  this.afs.collection('message', ref => ref.orderBy('ngaytao', 'asc'));
      this.messageRef.snapshotChanges().subscribe(data => {
        this.mess = data.map(e => {
          return {
            id: e.payload.doc.id,
            type: e.payload.doc.data()['type'],
            title: e.payload.doc.data()['title'],
            ngaytao: e.payload.doc.data()['ngaytao'],
            content: e.payload.doc.data()['content'],
          };
        })
        for(var i = 0;i<this.mess.length;i++){
          if(i == data.length -1){
            var today = new Date();
            var lastMessDate = this.mess[i].ngaytao.toDate();
            var currentDate = today.getHours()+"-"+today.getMinutes();
            var currentMessDate = lastMessDate.getHours()+"-"+lastMessDate.getMinutes();
            if(this.mess[i].type == "post" && currentDate == currentMessDate){
              this.notifyPost(this.mess[i].title,this.mess[i].content);
            }else if (this.mess[i].type == "thank" && currentDate == currentMessDate){
              this.notifyThank(this.mess[i].title,this.mess[i].content)
            }else if (this.mess[i].type == "abort" && currentDate == currentMessDate){
              this.notifyAbort(this.mess[i].title,this.mess[i].content)
            }
          }
        }
      });
     
    }
    sendNotification(type,title,content){
      let record = {};
      record['type'] = type;
      record['title'] = title;
      record['content'] = content;
      var today = new Date();
      record['ngaytao'] = today;
      this.afs.collection('message').add(record);
    }
    notifyPost(title,content){
      this.localNotifications.schedule({
        id: 1,
        title: title,
        text: content,
        sound: 'file://assets/sounds/notification.mp3',
        icon: 'file://assets/icon/mdpi.png',
        smallIcon: 'file://assets/icon/ldpi.png',
        data: { secret: 'key_data' }
      });
    }
    notifyThank(title,content){
      this.localNotifications.schedule({
        id: 1,
        title: title,
        text: content,
        sound: 'file://assets/sounds/notification.mp3',
        icon: 'file://assets/icon/mdpi.png',
        smallIcon: 'file://assets/icon/ldpi.png',
        data: { secret: 'key_data' }
      });
    }
    notifyAbort(title,content){
      this.localNotifications.schedule({
        id: 1,
        title: title,
        text: content,
        sound: 'file://assets/sounds/notification.mp3',
        icon: 'file://assets/icon/mdpi.png',
        smallIcon: 'file://assets/icon/ldpi.png',
        data: { secret: 'key_data' }
      });
    }
}