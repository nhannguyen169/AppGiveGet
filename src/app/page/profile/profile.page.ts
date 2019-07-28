import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../../service/authentication/authentication.service';
import { CrudUser } from  '../../service/authentication/crud.user';
import { CrudProduct } from '../../service/firestore/crud.product';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  messages = [
    {
      mess : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      mess : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
      mess : "but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
      mess : "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
    },
  ]
  users : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private crudProduct: CrudProduct,
    private crudUser : CrudUser
  ){}
  userEmail : any;
  userID : any;
  userIdGet : any;
  profilePrivate : boolean;
  userDateCreate : any;
  HistoryProduct : any;
  ngOnInit() {  
     //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          mssv: e.payload.doc.data()['mssv'],
          date: e.payload.doc.data()['createDate'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate']
        }
      })
    });
    this.crudProduct.read_HistoryProduct().subscribe(data => {
      this.HistoryProduct = data.map(e => {
        return {
          id: e.payload.doc.id,
          tensp: e.payload.doc.data()['tensp'],
          loaisp: e.payload.doc.data()['loaisp'],
          img:e.payload.doc.data()['image'],
          ngaytao:e.payload.doc.data()['ngaytao'].toDate(),
          ngayketthuc:e.payload.doc.data()['ngayketthuc'].toDate(),
          status:e.payload.doc.data()['tinhtrangsp'],
          method:e.payload.doc.data()['cachthucnhan'],
          nguoicho:e.payload.doc.data()['nguoicho'],
          nguoinhan:e.payload.doc.data()['nguoinhan']
        }
      })
    });
    this.userIdGet = this.activatedRoute.snapshot.paramMap.get('userId');
  }

  checkUserProfile(){
  
    if(this.authService.userDetails()){
      if(this.userIdGet == null){
        this.userID = this.authService.userDetails().uid;
        this.userEmail = this.authService.userDetails().email;
        this.userDateCreate = this.authService.userDetails().metadata.creationTime;
        this.profilePrivate = true;
      }else{
        for(var i = 0;i<this.users.length;i++){
          if(this.users[i].userID == this.userIdGet){
            this.userID = this.userIdGet;
            this.userEmail = this.users[i].email;
            this.userDateCreate = this.users[i].date;
            this.profilePrivate = false;
          }
        }
      }
    }
   
  }


  ionViewDidEnter(){
    this.checkUserProfile();
  }
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
 
  
}
