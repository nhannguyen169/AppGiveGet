import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { GetProducttype } from '../service/get.productype';
import { CrudProduct } from '../service/crud.product';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { Location } from '@angular/common';
import { ValidateProduct } from '../service/validate.product';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.page.html',
  styleUrls: ['./item-post.page.scss'],
})
export class ItemPostPage implements OnInit {

  constructor(
    private getProducttype: GetProducttype,
    private crudProduct: CrudProduct,
    private camera : Camera, 
    private location: Location ,
    private validateProduct: ValidateProduct,
    private loadingController: LoadingController
  ) { }

  producttype : any;
  newProductName : string;
  newProductDescribe : string;
  newProductType : string;
  newProductStatus : string;
  newProductMethod : boolean;
  captureDataUrl: string;
  imgUrl: string;
  hasUpImg: boolean;
  validated: boolean;
  ngOnInit() {
    //lay du lieu product type tu firebase
    this.getProducttype.read_Producttype().subscribe(data => {
      this.producttype = data.map(e => {
        return {
          name: e.payload.doc.data()['name']
        };
      })
    });
    this.hasUpImg = false;
    this.validated = false;
  }

  async getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
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
  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`ProductImage/${filename}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL);
    this.imgUrl = 'https://firebasestorage.googleapis.com/v0/b/appgiveget.appspot.com/o/ProductImage%2F'+filename+'.jpg?alt=media';
    this.hasUpImg = true;
  }
  //tao san pham 
  CreateRecord(newImage) {
    let record = {};
    record['tensp'] = this.newProductName;
    record['mota'] = this.newProductDescribe;
    record['loaisp'] = this.newProductType;
    record['tinhtrangsp'] = this.newProductStatus;
    record['cachthucnhan'] = this.newProductMethod;
    record['image'] = newImage;
    var today = new Date();
    record['ngaytao'] = today;
    this.crudProduct.create_NewProduct(record).then(resp => {
      this.newProductName = "";
      this.newProductDescribe = "";
      this.newProductType = "";
      this.newProductStatus = "";
      this.newProductMethod = undefined;
      this.imgUrl = undefined;
      this.captureDataUrl = "";
      this.hasUpImg = false;
      this.location.back();
      this.validateProduct.ToastSuccess();
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

 
  
  checkValidate(){
    if(this.captureDataUrl == undefined){
      this.validateProduct.ToastImage();
    }else if(this.newProductName == undefined){
      this.validateProduct.ToastName();
    }else if(this.newProductDescribe == undefined){
      this.validateProduct.ToastDescribe();
    }else if(this.newProductType == undefined){
      this.validateProduct.ToastType();
    }else if(this.newProductMethod  == undefined){
      this.validateProduct.ToastMethod();
    }else if(this.newProductStatus == undefined){
      this.validateProduct.ToastStatus();
    }else{
      this.validated = true;
    }
  }
  //function upload anh va thong tin san pham da tao
  async CreateProduct(){
    this.checkValidate();
    const loading = await this.loadingController.create({
      message: 'Đang xử lý'
    });
    if(this.validated == true){
      loading.present();
      await this.upload();
      if(this.hasUpImg == true){
        var img = this.imgUrl;
        await this.CreateRecord(img);
        await loading.dismiss();
      }
    }
    
  }

  //chuc nang scroll
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 80;
    }
  }
}
