import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { AlertController, ActionSheetController,LoadingController,ModalController } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { ValidateProduct } from '../../service/firestore/validate.product';
import { AuthService } from '../../service/authentication/authentication.service';
import { CrudUser } from  '../../service/authentication/crud.user';
import { ListGiveDetailPage } from '../../modal/list-give-detail/list-give-detail.page';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private crudProduct: CrudProduct,
    private validateProduct: ValidateProduct,
    private authService: AuthService,
    private crudUser : CrudUser
  ) { }
  colors = ["#3880ff","#0cd1e8","#7044ff","#10dc60","#ffce00","#f04141","#F0E68C","#FFB6C1","#20B2AA"];
  itemId = null;
  products : any;
  differentProducts : any;
  users : any;
  userSubmit : any;
  numberUserSubmit : any;
  disableBtn = true;
  hasLoad = false;
  nameSubmitBtn : string;
  userID : any;
  userGivenID : any;
  hasCreated = false;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  //trao doi phan tu trong mang
  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //kiem tra nguoi dung co submit hay khong
  checkUserSubmitOrGive(){
    var checkGet;
    var checkGive;
    if(this.userSubmit.length > 0){
      for(var i =0;i<this.userSubmit.length;i++){   
        if(this.userSubmit[i].user == this.userID){
          this.disableBtn = true;
          this.nameSubmitBtn = "Đã đăng ký nhận";
        }else if(this.userSubmit[i].hasChosen == true){
          this.disableBtn = true;
          this.nameSubmitBtn = "Đã có người được nhận sản phẩm này";
        }else{
          console.log("haha")
          checkGet = false;
        }
      }
    }else{
      checkGet = false;
    }
    for(var i =0;i<this.products.length;i++){   
      if(this.products[i].id == this.itemId){
        if(this.products[i].user == this.userID){
          this.disableBtn = true;
          this.nameSubmitBtn = "Bài đăng này là của bạn";
        }else{
          checkGive = false;
        }
      }
    }
    if(checkGive == false && checkGet == false){
      this.disableBtn = false;
      this.nameSubmitBtn = "Đăng ký nhận";
    }
  }
  
  getNumberUserSubmit(){
    this.numberUserSubmit = this.userSubmit.length;
  }

  getDifferentProducts(){
    this.differentProducts = [];
    this.shuffle(this.products);
    for(var i = 0;i<this.products.length;i++){
      if(this.products[i].id != this.itemId){
        this.differentProducts.push({
          id: this.products[i].id,
          loaisp: this.products[i].loaisp,
          tensp: this.products[i].tensp,
          img: this.products[i].img
        });
      }
    }
  }

  getUserGivenID(){
    for(var i = 0;i<this.products.length;i++){
      if(this.products[i].id == this.itemId){ 
        this.userGivenID = this.products[i].user;
      }
    }
  }

  ngOnInit() {
    //lay thong tin san pham tu firebase qua id
    this.itemId = this.activatedRoute.snapshot.paramMap.get('itemid');
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
          user:e.payload.doc.data()['user']
        };
      })
    });
    //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate']
        }
      })
    });
    
    //lay thong tin user submit
    this.crudProduct.read_GetProduct(this.itemId).subscribe(data => {
      this.userSubmit = data.map(e => {
        return {
          user:e.payload.doc.data()['user'],
          hasChosen:e.payload.doc.data()['hasChosen']
        };
      })
    });
    this.shuffle(this.colors);
  }
  ionViewDidEnter(){
    //lay thong tin user dang su dung app
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
    this.getNumberUserSubmit();
    this.checkUserSubmitOrGive();
    this.getDifferentProducts(); 
    this.getUserGivenID();
  }
  //chuc nang hien thi report
  async showReportAllert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: 'Bạn có muốn report bài đăng !',
      buttons: ['Không', 'Có']
    });

    await alert.present();
  }

  //chuc nang hien thi share
  async showShareAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chia sẻ',
      buttons: [{
        text: 'Facebook',
        role: 'destructive',
        icon: 'logo-facebook'
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  
  //chuc nang show toolbar
  showToolbar = false;
  countShuff = 0;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 300;
    }
  }

  //lay du lieu san pham de dang ky
  createGetData(){
    let record = {};
    record['user'] = this.userID;
    record['hasChosen'] = false; 
    this.disableBtn = true;
    this.crudProduct.add_GetProduct(this.itemId,record).then(resp =>{
      this.hasCreated = true;
      this.validateProduct.ToastGetSuccess();
      this.checkUserSubmitOrGive();
      this.getNumberUserSubmit();
    })  
  }
  //gui du lieu len firebase
  async submitGet(){
    const loading = await this.loadingController.create({
      message: 'Đang xử lý'
    });
    await this.createGetData();
    if(this.hasCreated == true){
      loading.dismiss();
    }
  }

  //show modal danh sach dang dang ky
  async presentModal() {
    const modal = await this.modalController.create({
      component: ListGiveDetailPage,
      componentProps: {
        "productID": this.itemId
      }
    });
    return await modal.present();
  }

}
