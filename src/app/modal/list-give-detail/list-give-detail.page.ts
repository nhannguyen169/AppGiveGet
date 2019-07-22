import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
@Component({
  selector: 'app-list-give-detail',
  templateUrl: './list-give-detail.page.html',
  styleUrls: ['./list-give-detail.page.scss'],
})
export class ListGiveDetailPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private crudProduct: CrudProduct,
    private crudUser : CrudUser,
    private navParams: NavParams
  ) { }
  
  userSubmit: any;
  users: any;
  listUserSubmit: any;
  //lay thong tin nguoi dung da dang ky 
  getUserHasSubmit(){
    this.crudProduct.read_GetProduct(this.navParams.data.productID).subscribe(data => {
      this.userSubmit = data.map(e => {
        return {
          user:e.payload.doc.data()['user']
        };
      })
    });
  }

  //lay thong tin tat ca nguoi dung
  getAllUser(){
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username']
        }
      })
    });
  }

  //hien thi thong tin nguoi dung da dang ky
  showListUserSubmit(){
    this.listUserSubmit = [];
    for(var i = 0; i<this.users.length;i++){
      for(var j = 0; j<this.userSubmit.length;j++)
        if(this.userSubmit[j].user == this.users[i].userID){
          this.listUserSubmit.push({
            id: this.users[i].userID,
            email: this.users[i].email,
            username: this.users[i].username
        });
      }
    }
  }
  ngOnInit() {
    this.getUserHasSubmit();
    this.getAllUser();
  }

  ionViewDidEnter(){
    this.showListUserSubmit();
  }

  checkClick(){
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
