import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class GetProducttype {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
  read_Producttype() {
    return this.firestore.collection('producttype').snapshotChanges();
  }
}