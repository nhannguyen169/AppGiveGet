import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { AuthService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-listgiveget',
  templateUrl: './listgiveget.page.html',
  styleUrls: ['./listgiveget.page.scss'],
})
export class ListgivegetPage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  products : any;
  userID : any;
  userSubmit : any;
  listUserSubmit : any;
  constructor(
    public alertController: AlertController,
    private crudProduct: CrudProduct,
    private authService: AuthService
  ){}

   //lay thong tin nguoi dung da dang ky 
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
          user:e.payload.doc.data()['user']
        });
      })
    });
  }

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
          user:e.payload.doc.data()['user']
        };
      })
    });

  }
  ionViewDidEnter(){
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
    for(var i =0;i<this.products.length;i++){ 
      this.getUserHasSubmit(this.products[i].id,this.products[i].loaisp,this.products[i].tensp,this.products[i].date,this.products[i].img); 
    }
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
