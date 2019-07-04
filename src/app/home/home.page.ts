import { Component, ViewChild} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CrudProduct } from '../service/crud.product';
@Component({  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;

  constructor(private crudProduct: CrudProduct) {
   
  }
  products : any;
  initializeProduct : any;
  hasSearch = false;
  //lay thong tin san pham
  ngOnInit() {   
    this.crudProduct.read_Products().subscribe(data => { 
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          tensp: e.payload.doc.data()['tensp'],
          loaisp: e.payload.doc.data()['loaisp'],
          img:e.payload.doc.data()['image']
        };
      })
      this.initializeProduct = this.products;
    });
  }

  //load ve du lieu ban dau
  initialize(){
    this.products = this.initializeProduct;
    this.hasSearch = false;
  }
  //tim kiem san pham
  searchProduct(input: any) {
    this.initialize();
    let serVal = input.target.value;
    if (serVal && serVal.trim() != '') {
      this.hasSearch = true;
      this.products = this.products.filter((result) => {
        return (String(result.tensp).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }

  //scroll len dau trang 
  scrollToTop() {
    this.content.scrollToTop(400);
  }
  ionViewDidEnter(){
    this.scrollToTop();
  }
 
}
