import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
import { SendNotification } from '../../service/notification//send.notification';
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
    private sendNotification : SendNotification,
    private navParams: NavParams
  ) {}

  listAllUser:any;
  products:any;
  giveUserID:any;
  getUserID:any;
  rate:any;
  ngOnInit() {
    this.crudProduct.read_Products().subscribe(data => { 
      this.products = data.map(e => {
          return {
            id: e.payload.doc.id,
            tensp: e.payload.doc.data()['tensp'],
            loaisp: e.payload.doc.data()['loaisp'],
            img:e.payload.doc.data()['image'],
            date:e.payload.doc.data()['ngaytao'].toDate(),
            note:e.payload.doc.data()['mota'],
            status:e.payload.doc.data()['tinhtrangsp'],
            method:e.payload.doc.data()['cachthucnhan'],
            user:e.payload.doc.data()['user']
          };
      })
    });
    this.crudUser.readUser().subscribe(data => {
      this.listAllUser = data.map(e => {
        return {
          id:e.payload.doc.id,
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          fullname: e.payload.doc.data()['fullname'],
          khoa:e.payload.doc.data()['khoa'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate'],
        };
      })
    });
    this.giveUserID = this.navParams.data.giveUserID;
    this.getUserID = this.navParams.data.getUserID;
  }

  onRateChange(event){
    this.rate = event;
  }

  saveRate(ms){
    var docUserID;
    var message;
    var today = new Date();
    let recordProduct = {};
    let recordUser = {};
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id == this.navParams.data.productID){
        recordProduct['tensp'] = this.products[i].tensp;
        recordProduct['mota'] = this.products[i].note;
        recordProduct['loaisp'] = this.products[i].loaisp;
        recordProduct['tinhtrangsp'] = this.products[i].status;
        recordProduct['cachthucnhan'] = this.products[i].method;
        recordProduct['image'] = this.products[i].img;
        recordProduct['nguoicho'] = this.giveUserID;
        recordProduct['nguoinhan'] = this.getUserID;
        recordProduct['ngaytao'] = this.products[i].date;
        recordProduct['ngayketthuc'] = today;
      }
    }
    this.crudProduct.create_NewHistoryProduct(recordProduct).then(resp => {
      this.crudProduct.delete_Product(this.navParams.data.productID);
      console.log(resp);
    }).catch(error => {
        console.log(error);
    });

    for(var i=0;i<this.listAllUser.length;i++){
      if(this.listAllUser[i].userID == this.giveUserID){
        message = "Cảm ơn bạn "+this.listAllUser[i].fullname+", Khoa "+this.listAllUser[i].khoa+ " đã cho thành công";
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
    this.sendNotification.sendNotification("thank","Cảm ơn",message);
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
