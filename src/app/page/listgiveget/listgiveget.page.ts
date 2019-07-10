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
  constructor(
    public alertController: AlertController,
    private crudProduct: CrudProduct,
    private authService: AuthService
  ){}

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

    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
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
