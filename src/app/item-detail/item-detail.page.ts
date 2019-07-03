import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CrudProduct } from '../service/crud.product';
import { GetProducttype } from '../service/get.productype';
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
    private crudProduct: CrudProduct,
    private getProducttype: GetProducttype
  ) { }
  itemId = null;
  products : any;
  producttype : any;
  hasLoad = false;
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
}
