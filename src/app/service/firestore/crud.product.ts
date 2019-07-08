import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudProduct {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
  create_NewProduct(record) {
    return this.firestore.collection('products').add(record);
  }
 
  read_Products() {
    return this.firestore.collection('products').snapshotChanges();
  }
 
  update_Product(recordID,record){
    this.firestore.doc('products/' + recordID).update(record);
  }
 
  delete_Product(record_id) {
    this.firestore.doc('products/' + record_id).delete();
  }
}