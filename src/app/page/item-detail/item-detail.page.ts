import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { AlertController, ActionSheetController,LoadingController } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { ValidateProduct } from '../../service/firestore/validate.product';
import { GetProducttype } from '../../service/firestore/get.productype';
import { AuthService } from '../../service/authentication/authentication.service';
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
    private crudProduct: CrudProduct,
    private validateProduct: ValidateProduct,
    private getProducttype: GetProducttype,
    private authService: AuthService
  ) { }
  itemId = null;
  products : any;
  producttype : any;
  userSubmit : any;
  hasSubmit = false;
  hasLoad = false;
  userID : any;
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

  //lay thong tin nguoi dung da dang ky 
  getUserHasSubmit(ms){
    this.crudProduct.read_GetProduct(this.itemId).subscribe(data => {
      this.userSubmit = data.map(e => {
        return {
          user:e.payload.doc.data()['user']
        };
      })
    });
    return new Promise(r => setTimeout(r, ms))
  }

  checkUserHasSubmit(){
    for(var i =0;i<this.userSubmit.length;i++){   
      console.log(this.userSubmit[i].user);
      if(this.userSubmit[i].user == this.userID){
        this.hasSubmit = true;
      }
    }
  }

  async validateSubmit(){
    await this.getUserHasSubmit(500);
    await this.checkUserHasSubmit();
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
          status:e.payload.doc.data()['tinhtrangsp']
        };
      })
    });
     //lay du lieu product type tu firebase
     this.getProducttype.read_Producttype().subscribe(data => {
      this.producttype = data.map(e => {
        return {
          name: e.payload.doc.data()['name'],
          icon: 'https://firebasestorage.googleapis.com/v0/b/appgiveget.appspot.com/o/Category%2F'+e.payload.doc.data()['icon']+'.png?alt=media'
        }
      })
    });
    //lay thong tin user dang su dung
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
    
  }
  ionViewDidEnter(){
    this.validateSubmit();
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
    this.countShuff++;
    if(this.countShuff == 1){
      this.shuffle(this.products);
    }
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 300;
    }
  }

  //lay du lieu san pham de dang ky
  createGetData(){
    let record = {};
    record['user'] = this.userID;
    this.crudProduct.add_GetProduct(this.itemId,record).then(resp =>{
      this.hasCreated = true;
      this.validateProduct.ToastGetSuccess();
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


}
