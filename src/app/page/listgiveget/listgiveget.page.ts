import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController,ModalController } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
import { AuthService } from '../../service/authentication/authentication.service';
import { RatingPage } from '../../modal/rating/rating.page';
@Component({
  selector: 'app-listgiveget',
  templateUrl: './listgiveget.page.html',
  styleUrls: ['./listgiveget.page.scss'],
})
export class ListgivegetPage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  constructor(
    public alertController: AlertController,
    private crudProduct: CrudProduct,
    private crudUser: CrudUser,
    private modalController: ModalController,
    private authService: AuthService
  ){}

  products : any;
  listAllUser : any;
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
          confirmGive:e.payload.doc.data()['confirmGiven'],
          confirmGet:e.payload.doc.data()['confirmGotten'],
          hasRated:e.payload.doc.data()['rated'],
          user:e.payload.doc.data()['user']
        };
      })
    });

    this.crudUser.readUser().subscribe(data => {
      this.listAllUser = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username']
        };
      })
    });
    this.listUserSubmit = null;
  }

  userID : any;
  ionViewDidEnter(){
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
    for(var i =0;i<this.products.length;i++){ 
      this.getUserHasSubmit(this.products[i].id,this.products[i].loaisp,this.products[i].tensp,this.products[i].date,this.products[i].img);
    }
  }


  listUserSubmit : any;
  //lay thong tin nguoi dung da dang ky cho trang get
  getUserHasSubmit(productID,loaisp,tensp,date,img){
    this.listUserSubmit = [];
    this.crudProduct.read_GetProduct(productID).subscribe(data => {
      data.map(e => {
        this.listUserSubmit.push({
          id: productID,
          loaisp : loaisp,
          tensp : tensp,
          date : date,
          img : img,
          userid:e.payload.doc.id,
          user:e.payload.doc.data()['user'],
          hasChosen : e.payload.doc.data()['hasChosen']
        });
      })
    });
  }
  
  listUserSubcribe : any;
  //lay thong tin tat ca nguoi dung va thong tin cua nhung nguoi dung dang ky cho tung san pham
  getUserInformation(productId,ms){
    this.listUserSubcribe = [];
    this.crudProduct.read_GetProduct(productId).subscribe(data => {
      data.map(e => {
        this.listUserSubcribe.push({
          id:e.payload.doc.id,
          user:e.payload.doc.data()['user'],
          hasChosen : e.payload.doc.data()['hasChosen']
        });
      })
    });
    return new Promise(r => setTimeout(r, ms))
   
  }

  listShowUserSubcribe : any;
  //hien thi thong tin nguoi dung len popup
  getUserSubcribe(){
    this.listShowUserSubcribe = [];
    var checked = false;
    for(var i =0;i<this.listUserSubcribe.length;i++){
      for(var j = 0;j<this.listAllUser.length;j++){
        if(this.listUserSubcribe[i].user == this.listAllUser[j].userID){
          if(this.listUserSubcribe[i].hasChosen == true){
            checked = true
          }
          this.listShowUserSubcribe.push({
            type: 'radio',
            value : this.listUserSubcribe[i].id,
            label : ''+this.listAllUser[j].email,
            checked : checked
          });
        }
      }
    }
    return checked;
  }
  
  
  //hien thi popup chon nguoi nhan
  async presentChooseSubcriber(productId) {
    await this.getUserInformation(productId,500);
    await this.getUserSubcribe();
    const alert = await this.alertController.create({
      header: 'Chọn người nhận',
      inputs: this.listShowUserSubcribe,
      buttons: [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Hoàn tất',
          handler: data => {
            let record = {};
            record['hasChosen'] = true;
            if(this.getUserSubcribe() != true){
              this.crudProduct.update_GetProduct(productId,data,record);
              console.log('dk tk');
            }else{
              console.log('da dk');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  //kiem tra co xac nhan cho va nhan hay khong
  checkGiveAndGetConfirm(productid){
    for(var i =0;i<this.products.length;i++){
      if(this.products[i].id == productid){
        if(this.products[i].confirmGet == true && this.products[i].confirmGive == true){
          return "Người nhận đã xác nhận <br/> Người cho đã xác nhận";
        }else if(this.products[i].confirmGet == true && this.products[i].confirmGive == false){
          return "Người nhận đã xác nhận <br/> Người cho chưa xác nhận";
        }else if(this.products[i].confirmGet == false && this.products[i].confirmGive == true){
          return "Người nhận chưa xác nhận <br/> Người cho đã xác nhận";
        }else if(this.products[i].confirmGet == false && this.products[i].confirmGive == false){
          return "Người nhận chưa xác nhận <br/> Người cho chưa xác nhận";
        }
      }
    }

  }

  //kiem tra nguoi dung da rate chua
  checkUserHasRate(productid){
    for(var i =0;i<this.products.length;i++){
      if(this.products[i].id == productid){ 
        if(this.products[i].hasRated == true){
          return true;
        }else if(this.products[i].hasRated == false){
          return false;
        }
      }
    }
  }

  //hien thi popup xac nhan cho nguoi dang
  async showPopupConfirmGive(productid){
    var fieldChosen = 'Chưa có người đăng ký';
    var fieldConfirm ;
    var hasUserConfirm = false;
    var hasRated = false;
    var confirmDone = false;
    var arr;
    for(var j =0;j<this.listUserSubmit.length;j++){
      for(var i =0;i<this.listAllUser.length;i++){
        if(this.listUserSubmit[j].id == productid){
          if(this.listUserSubmit[j].user == this.listAllUser[i].userID && this.listUserSubmit[j].hasChosen == true){
            fieldChosen = 'Người được nhận: '+ this.listAllUser[i].email;
            fieldConfirm = this.checkGiveAndGetConfirm(productid);
            if(fieldConfirm == "Người nhận đã xác nhận <br/> Người cho đã xác nhận"){
              confirmDone = true;
              if(this.checkUserHasRate(productid) == true){
                hasRated = true;
              }
            }
            hasUserConfirm = true;
          }else if(this.listUserSubmit[j].user == this.listAllUser[i].userID && this.listUserSubmit[j].hasChosen != true){
            fieldChosen = 'Chưa có người được nhận';
          }
        }
      }
    }
    if(confirmDone == true && hasUserConfirm == true && hasRated == false){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Đợi người dùng đánh giá',
          handler: data => {
            console.log('Confirm xác nhận');
          }
        }
      ]
    }else if(confirmDone == false && hasUserConfirm == true){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Xác nhận',
          handler: data => {
            let record = {};
            record['confirmGiven'] = true;
            this.crudProduct.update_Product(productid,record);
            console.log('Confirm xác nhận');
          }
        }
      ]
    }else if(hasUserConfirm == false){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    }
   
    const alert = await this.alertController.create({
      header: 'Xác nhận giao dịch',
      subHeader: fieldChosen,
      message: fieldConfirm,
      buttons: arr
    });
    await alert.present();
  }

  //hien thi popup xac nhan cho nguoi nhan
  async showPopupConfirmGet(productid){
    var fieldGiven;
    var fieldConfirm ;
    var confirmDone = false;
    var arr;
    var userID;
    for(var i =0;i<this.products.length;i++){
      for(var j =0;j<this.listAllUser.length;j++){
        if(this.products[i].id == productid && this.products[i].user == this.listAllUser[j].userID){
          fieldGiven = "Người cho: " +this.listAllUser[j].email;
          userID = this.products[i].user;
        }
      }
    }
    fieldConfirm = this.checkGiveAndGetConfirm(productid);
    if(fieldConfirm == "Người nhận đã xác nhận <br/> Người cho đã xác nhận"){
      confirmDone = true;
    }
    if(confirmDone == true){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Đánh giá',
          handler: data => {
            this.presentRatingModal(productid,userID,this.userID);
            console.log('Confirm xác nhận');
          }
        }
      ]
    }else{
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Xác nhận',
          handler: data => {
            let record = {};
            record['confirmGotten'] = true;
            this.crudProduct.update_Product(productid,record);
            console.log('Confirm xác nhận');
          }
        }
      ]
    }
    const alert = await this.alertController.create({
      header: 'Xác nhận giao dịch',
      subHeader: fieldGiven,
      message: fieldConfirm,
      buttons: arr
    });
    await alert.present();
  }

  //show modal rating
  async presentRatingModal(productid,giveUserid,getUserid) {
    const modal = await this.modalController.create({
      component: RatingPage,
      componentProps: {
        "giveUserID": giveUserid,
        "getUserID": getUserid,
        "productID": productid
      }
    });
    return await modal.present();
  }
  
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  async showReportAllert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: 'Bạn có muốn xoá !',
      buttons: ['Không', 'Có']
    });

    await alert.present();
  }

}
