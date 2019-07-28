import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private crudProduct: CrudProduct,
    private crudUser : CrudUser,
    private navParams: NavParams
  ) {}

  listAllUser:any;
  userID:any;
  rate:any;
  ngOnInit() {
    this.crudUser.readUser().subscribe(data => {
      this.listAllUser = data.map(e => {
        return {
          id:e.payload.doc.id,
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate'],
        };
      })
    });
    this.userID = this.navParams.data.userID;
  }

  onRateChange(event){
    this.rate = event;
  }

  saveRate(ms){
    var docUserID;
    let recordProduct = {};
    let recordUser = {};
    recordProduct['rated'] = true;
    recordProduct['disable'] = true;
    this.crudProduct.update_Product(this.navParams.data.productID,recordProduct);
    for(var i=0;i<this.listAllUser.length;i++){
      if(this.listAllUser[i].userID == this.userID){
        if(this.listAllUser[i].rating == 0){
          recordUser['rating'] = this.rate;
        }else if(this.listAllUser[i].rating > 0){
          recordUser['rating'] = (this.listAllUser[i].rating + this.rate) /2;
        }
        recordUser['numberUserRate'] = this.listAllUser[i].numUserRate + 1;
        docUserID = this.listAllUser[i].id;
      }
    }
    this.crudUser.updateUser(docUserID,recordUser);
    return new Promise(r => setTimeout(r, ms))
  }
  
  async confirmSave(){
    await this.saveRate(1000);
    await this.dismissModal();
  }
  
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
