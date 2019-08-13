import { Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthService {
 
  constructor(public toastController: ToastController){}
  
  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      console.log("send verification");
    })
  }

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

  async ToastMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}