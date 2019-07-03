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
    });
  }
  scrollToTop() {
    this.content.scrollToTop(400);
  }
  ionViewDidEnter(){
    this.scrollToTop();
  }
 
}
