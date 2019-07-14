import { Component, OnInit } from '@angular/core';
import { GetProducttype } from '../../../service/firestore/get.productype';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {


  
  constructor(
    private getProducttype: GetProducttype
  ){}
  producttype : any;
  colors = ["#3880ff","#0cd1e8","#7044ff","#10dc60","#ffce00","#f04141","#F0E68C","#FFB6C1","#20B2AA"];
  ngOnInit() {
     //lay du lieu product type tu firebase
     this.getProducttype.read_Producttype().subscribe(data => {
      this.producttype = data.map(e => {
        return {
          name: e.payload.doc.data()['name'],
          icon: 'https://firebasestorage.googleapis.com/v0/b/appgiveget.appspot.com/o/Category%2F'+e.payload.doc.data()['icon']+'.png?alt=media'
        }
      })
    });

    this.shuffle(this.colors);
    
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
}
