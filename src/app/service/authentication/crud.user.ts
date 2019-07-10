import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudUser {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 

  readUser(){
    return this.firestore.collection('user').snapshotChanges();
  }
}