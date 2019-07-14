import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudProduct } from '../../../service/firestore/crud.product';
import { ScrollDetail } from '@ionic/core';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudProduct: CrudProduct
  ) { }
    categoryName : any;
    products : any;
    initializeProduct : any;
    hasSearch = false;
  ngOnInit() {
    //lay thong tin san pham tu firebase qua id
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('categoryName');
    this.crudProduct.read_Products().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          tensp: e.payload.doc.data()['tensp'],
          loaisp: e.payload.doc.data()['loaisp'],
          img:e.payload.doc.data()['image'],
          date:e.payload.doc.data()['ngaytao'].toDate()
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

  //chuc nang scroll
  disableFab = true;
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
      if(scrollTop >= 100){
       this.disableFab = false;
      }else{
       this.disableFab = true;
      }
    }
  }
}
