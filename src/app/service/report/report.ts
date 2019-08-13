import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
 
  constructor(
    private firestore: AngularFirestore,
    public toastController: ToastController
  ) { }
 
  create_NewReport(record) {
    return this.firestore.collection('reports').add(record);
  }
  read_Report(){
    return this.firestore.collection('reports').snapshotChanges();
  }
  async ToastMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}