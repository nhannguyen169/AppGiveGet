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
    return this.firestore.collection('products',ref => ref.orderBy('ngaytao', 'desc')).snapshotChanges();
  }

  update_Product(recordID,record){
    this.firestore.doc('products/' + recordID).update(record);
  }
 
  delete_Product(record_id) {
    this.firestore.collection('products').doc(record_id).delete();
  }

  add_GetProduct(productID,record) {
    return this.firestore.doc('products/' + productID).collection('listGet').add(record);
  }

  read_GetProduct(productID){
    return this.firestore.doc('products/' + productID).collection('listGet').snapshotChanges();
  }

  update_GetProduct(productID,recordID,record){
    this.firestore.doc('products/'+productID+'/listGet/'+recordID).update(record);
  }

  delete_GetProduct(productID,recordID) {
    this.firestore.doc('products/'+productID+'/listGet/'+recordID).delete();
  }

  create_NewHistoryProduct(record) {
    return this.firestore.collection('HistoryProducts').add(record);
  }
  read_HistoryProduct() {
    return this.firestore.collection('HistoryProducts').snapshotChanges();
  }
}