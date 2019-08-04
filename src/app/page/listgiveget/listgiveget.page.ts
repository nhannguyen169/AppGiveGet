import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController,ModalController,LoadingController,ActionSheetController} from '@ionic/angular';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
import { GetProducttype } from '../../service/firestore/get.productype';
import { AuthService } from '../../service/authentication/authentication.service';
import { ValidateProduct } from '../../service/firestore/validate.product';
import { RatingPage } from '../../modal/rating/rating.page';
import { SendNotification } from '../../service/notification//send.notification';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
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
    public actionSheetController: ActionSheetController,
    private router : Router,
    private camera : Camera,
    private crudProduct: CrudProduct,
    private crudUser: CrudUser,
    private sendNotification : SendNotification,
    private getProducttype: GetProducttype,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private validateProduct: ValidateProduct,
    private authService: AuthService,
  ){}

  products : any;
  listAllUser : any;
  producttype:any;
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
          numEdit:e.payload.doc.data()['numberEdit'],
          isEdit:false,
          user:e.payload.doc.data()['user']
        };
      })
    });

    this.crudUser.readUser().subscribe(data => {
      this.listAllUser = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          fullname: e.payload.doc.data()['fullname'],
          khoa: e.payload.doc.data()['khoa'],
          rating :e.payload.doc.data()['rating'],
          numberUserRate: e.payload.doc.data()['numberUserRate']
        };
      })
    });

     //lay du lieu product type tu firebase
     this.getProducttype.read_Producttype().subscribe(data => {
      this.producttype = data.map(e => {
        return {
          name: e.payload.doc.data()['name']
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
  
  listRandomUser: any;
  listButtonRandomUserSubcribe : any;
  listButtonManualUserSubcribe : any;
  //hien thi thong tin nguoi dung len popup
  getUserSubcribe(){
    this.listButtonRandomUserSubcribe = [];
    this.listButtonManualUserSubcribe = [];
    this.listRandomUser = [];
    var checked = false;
    var ratioTotalGive;
    for(var i =0;i<this.listUserSubcribe.length;i++){
      for(var j = 0;j<this.listAllUser.length;j++){
        if(this.listUserSubcribe[i].user == this.listAllUser[j].userID){
          if(this.listUserSubcribe[i].hasChosen == true){
            checked = true
          }
          this.listButtonManualUserSubcribe.push({
            type: 'radio',
            value : this.listUserSubcribe[i].id,
            label : ''+this.listAllUser[j].email,
            checked : this.listUserSubcribe[i].hasChosen
          });
          this.listButtonRandomUserSubcribe.push({
            type: 'radio',
            disabled: true,
            value : this.listUserSubcribe[i].id,
            label : ''+this.listAllUser[j].email,
            checked : this.listUserSubcribe[i].hasChosen
          });

          if(this.listAllUser[j].numberUserRate > 15){
            ratioTotalGive = 5;
          }else if(this.listAllUser[j].numberUserRate > 10 && this.listAllUser[j].numberUserRate <= 15){
            ratioTotalGive = 4;
          }else if(this.listAllUser[j].numberUserRate > 5 && this.listAllUser[j].numberUserRate <= 10){
            ratioTotalGive = 3;
          }else if(this.listAllUser[j].numberUserRate > 3 && this.listAllUser[j].numberUserRate <= 5){ 
            ratioTotalGive = 2;
          }else if(this.listAllUser[j].numberUserRate > 0 && this.listAllUser[j].numberUserRate <= 3){
            ratioTotalGive = 1;
          }else{
            ratioTotalGive = 0;
          }
        
          this.listRandomUser.push({
            userId:this.listUserSubcribe[i].id,
            ratioRandom:this.listAllUser[j].rating + ratioTotalGive
          });
        }
      }
    }
    return checked;
  }
  
   //trao doi phan tu trong mang
   shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  randomChooseUser(){
    this.shuffle(this.listRandomUser);
    this.listRandomUser.sort((a, b) => (a.ratioRandom > b.ratioRandom) ? 1 : -1)
    for(var i =0;i<this.listRandomUser.length;i++){
      if(i = this.listRandomUser.length - 1){
        return this.listRandomUser[i].userId;
      }
    }
  }

   //hien thi popup chon nguoi nhan
  async presentRandomSubcriber(productId) {
    var arr;
    await this.getUserInformation(productId,500);
    await this.getUserSubcribe();
    if(this.getUserSubcribe() != true && this.listUserSubcribe.length > 0){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          text: 'Quay ngẫu nhiên',
          handler: data => {
            let record = {};
            record['hasChosen'] = true;
            if(this.getUserSubcribe() != true){
              var data = this.randomChooseUser();
              this.crudProduct.update_GetProduct(productId,data,record);
            }else{
              console.log('da dk');
            }
          }
        }
      ]
    }else if(this.getUserSubcribe() == true || this.listUserSubcribe.length == 0){
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
      header: 'Random người nhận',
      inputs: this.listButtonRandomUserSubcribe,
      buttons: arr
    });
    await alert.present();
  }

  //hien thi popup chon nguoi nhan
  async presentChooseSubcriber(productId) {
    var arr;
    await this.getUserInformation(productId,500);
    await this.getUserSubcribe();
    if(this.getUserSubcribe() != true && this.listUserSubcribe.length > 0){
      arr = [
        {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
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
    }else if(this.getUserSubcribe() == true || this.listUserSubcribe.length == 0){
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
      header: 'Chọn người nhận',
      inputs: this.listButtonManualUserSubcribe,
      buttons: arr
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
    var hasChosen = false;
    var confirmDone = false;
    var arr;
    for(var j =0;j<this.listUserSubmit.length;j++){
      for(var i =0;i<this.listAllUser.length;i++){
        if(this.listUserSubmit[j].id == productid){
          if(this.listUserSubmit[j].user == this.listAllUser[i].userID && this.listUserSubmit[j].hasChosen == true){
            hasChosen = true;
            fieldChosen = 'Người được nhận: '+ this.listAllUser[i].email;
            fieldConfirm = this.checkGiveAndGetConfirm(productid);
            if(fieldConfirm == "Người nhận đã xác nhận <br/> Người cho đã xác nhận"){
              confirmDone = true;
              if(this.checkUserHasRate(productid) == true){
                hasRated = true;
              }
            }
            hasUserConfirm = true;
          }else if(this.listUserSubmit[j].user == this.listAllUser[i].userID && this.listUserSubmit[j].hasChosen != true && hasChosen == false){
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

  
  editProduct(record) {
    record.isEdit = true;
    record.Edittensp = record.tensp;
    record.Editloaisp = record.loaisp;
    record.Editnote =  record.note;
    record.Editstatus =  record.status;
    record.Editmethod =  record.method;
    record.Editimg = record.img;
    record.EditnumEdit = record.numEdit;
  }

  captureDataUrl: string;
  //lay hinh tu album trong device
  async getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,
      correctOrientation : true,
      sourceType: sourceType
    };
    const loading = await this.loadingController.create({
      message: 'Đang load ảnh'
    });
    loading.present();
    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
       loading.dismiss();
    }, (err) => {
        console.log(err);
        loading.dismiss();
    });
  }  

  //upload img len firebase
  upload(imgName) {
    let storageRef = firebase.storage().ref();
    const filename = imgName;

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`ProductImage/${filename}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL);
  }

  validated = false;
  checkValidate(record){
    if(record.Edittensp == ""){
      this.validateProduct.ToastName();
    }else if(record.Editnote == ""){
      this.validateProduct.ToastDescribe();
    }else{
      this.validated = true;
    }
  }

  UpdateRecord(recordRow) {
    let record = {};
    var countEdit = recordRow.EditnumEdit + 1;
    record['tensp'] =  recordRow.Edittensp;
    record['mota'] = recordRow.Editnote;
    record['loaisp'] = recordRow.Editloaisp;
    record['tinhtrangsp'] = recordRow.Editstatus;
    record['cachthucnhan'] = recordRow.Editmethod;
    record['image'] = recordRow.Editimg+"&change="+countEdit;
    record['numberEdit'] = countEdit;
    console.log(recordRow.Editimg+"&change=1");
    this.crudProduct.update_Product(recordRow.id, record);
    recordRow.isEdit = false;
    this.captureDataUrl = undefined;
    this.validated = false;
  }

  async loadingUpdate(ms){
    const loading = await this.loadingController.create({
      message: 'Đang xử lý',
      duration: 10000
    });
    await loading.present();
    return new Promise(r => setTimeout(r, ms))
  }

  async updateProduct(recordRow,imgName){
    this.checkValidate(recordRow);
    if(this.validated == true){
      if(this.captureDataUrl != undefined){
        this.upload(imgName.substr(84,10));
      }
      await this.loadingUpdate(10000);
      await this.UpdateRecord(recordRow);
    }  
  }
  async showDeleteGiveAllert(productid) {
    var fieldChosen = 'Bạn có muốn xoá !';
    var fullname;
    var khoa;
    var username;
    var title;
    var message;
    for(var j =0;j<this.listUserSubmit.length;j++){
      for(var i =0;i<this.listAllUser.length;i++){
        if(this.userID == this.listAllUser[i].userID){
          fullname = this.listAllUser[i].fullname;
          khoa = this.listAllUser[i].khoa;
          username = this.listAllUser[i].username;
        }
        if(this.listUserSubmit[j].id == productid){
          title = username+" đã xóa bài đăng: "+this.listUserSubmit[j].tensp ;
          if(this.listUserSubmit[j].user == this.listAllUser[i].userID && this.listUserSubmit[j].hasChosen == true){
            fieldChosen = 'Đang có người đang thực hiện giao dịch với bạn. <br/> Bạn có mún xóa !';
            message = "Cảm ơn bạn "+fullname+" Khoa "+khoa+" đã đăng bài trên Give Get và xin lỗi bạn "+this.listAllUser[i].fullname+" đang thực hiện giao dịch này.";
          }else{
            message = "Cảm ơn bạn "+fullname+" Khoa "+khoa+" đã đăng bài trên Give Get";
          }
        }
      }
    }
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: fieldChosen,
      buttons: [
          {
            text: 'Hủy',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Xóa',
            handler: data => {
              this.crudProduct.delete_Product(productid);
              this.sendNotification.sendNotification("thank",title,message);
            }
          }
      ]
    });
    await alert.present();
  }

  async showDeleteGetAllert(productid) {
    var fieldChosen = 'Bạn có muốn hủy nhận sản phẩm !';
    var userHasChosen = false;
    var docID;
    var username;
    var title;
    var message;
    for(var j =0;j<this.listUserSubmit.length;j++){
      for(var i =0;i<this.listAllUser.length;i++){
        if(this.userID == this.listAllUser[i].userID){
          username = this.listAllUser[i].username;
        }
        if(this.listUserSubmit[j].id == productid){
          title = username+" đã hủy nhận: "+this.listUserSubmit[j].tensp ;
          if(this.listUserSubmit[j].user == this.userID && this.listUserSubmit[j].hasChosen == true){ 
            fieldChosen = 'Bạn đã được chọn nhận sản phẩm <br/> Bạn có chắc mún hủy nhận !';
            message = "Sản phẩm trên đã không có người được chọn nên các bạn vẫn còn cơ hội để đăng ký nhận sản phẩm này nhé !";
            userHasChosen = true;
            docID = this.listUserSubmit[j].userid;
          }else if(this.listUserSubmit[j].user == this.userID && this.listUserSubmit[j].hasChosen == false){
            docID = this.listUserSubmit[j].userid;
          }
        }
      }
    }
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: fieldChosen,
      buttons: [
          {
            text: 'Hủy',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Xóa',
            handler: data => {
              this.crudProduct.delete_GetProduct(productid,docID);
              if(userHasChosen == true){
                this.sendNotification.sendNotification("abort",title,message)
              }
              this.router.navigateByUrl('/tabs/menu');
            }
          }
      ]
    });
    await alert.present();
  }

  async presentOptionsCardGive(products,productID,productMethod) {
    var arr;
    if(productMethod == "false"){
      arr = [
        {
        text: 'Chọn người nhận',
        icon: 'contacts',
        handler: () => {
          this.presentChooseSubcriber(productID);
        }
      }, {
        text: 'Trạng thái sản phẩm',
        icon: 'checkbox-outline',
        handler: () => {
          this.showPopupConfirmGive(productID)
        }
      }, {
        text: 'Xem chi tiết sản phẩm',
        icon: 'eye',
        handler: () => {
          this.router.navigateByUrl("/item-detail/"+productID);
        }
      }, {
        text: 'Sửa thông tin sản phẩm',
        icon: 'create',
        handler: () => {
          this.editProduct(products);
        }
      },{
        text: 'Xóa sản phẩm',
        icon: 'trash',
        handler: () => {
          this.showDeleteGiveAllert(productID);
        }
      }, {
        text: 'Đóng',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }else if(productMethod == "true"){
      arr = [
        {
          text: 'Random chọn người nhận',
          icon: 'contacts',
          handler: () => {
            this.presentRandomSubcriber(productID);
          }
      }, {
        text: 'Trạng thái sản phẩm',
        icon: 'checkbox-outline',
        handler: () => {
          this.showPopupConfirmGive(productID)
        }
      }, {
        text: 'Xem chi tiết sản phẩm',
        icon: 'eye',
        handler: () => {
          this.router.navigateByUrl("/item-detail/"+productID);
        }
      }, {
        text: 'Sửa thông tin sản phẩm',
        icon: 'create',
        handler: () => {
          this.editProduct(products);
        }
      },{
        text: 'Xóa sản phẩm',
        icon: 'trash',
        handler: () => {
          this.showDeleteGiveAllert(productID);
        }
      }, {
        text: 'Đóng',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }
  
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Thao tác',
      buttons: arr
    });
    await actionSheet.present();
  }

  async presentOptionsCardGet(productID,hasChosen) {
    var arr;
    if(hasChosen == true){
      arr = [
        {
        text: 'Tình trạng giao dịch',
        icon: 'checkbox-outline',
        handler: () => {
          this.showPopupConfirmGet(productID)
        }
      }, {
        text: 'Xem chi tiết sản phẩm',
        icon: 'eye',
        handler: () => {
          this.router.navigateByUrl("/item-detail/"+productID);
        }
      }, {
        text: 'Hủy nhận sản phẩm',
        icon: 'trash',
        handler: () => {
          this.showDeleteGetAllert(productID);
        }
      }, {
        text: 'Đóng',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }else if(hasChosen == false){
      arr = [
        {
          text: 'Xem chi tiết sản phẩm',
          icon: 'eye',
          handler: () => {
            this.router.navigateByUrl("/item-detail/"+productID);
          }
        }, {
          text: 'Hủy nhận sản phẩm',
          icon: 'trash',
          handler: () => {
            this.showDeleteGetAllert(productID);
          }
        }, {
          text: 'Đóng',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    }
  
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Thao tác',
      buttons: arr
    });
    await actionSheet.present();
  }

}
