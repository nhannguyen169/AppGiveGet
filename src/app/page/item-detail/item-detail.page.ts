import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { AlertController, ActionSheetController,LoadingController,ModalController } from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { ValidateProduct } from '../../service/firestore/validate.product';
import { AuthService } from '../../service/authentication/authentication.service';
import { CrudUser } from  '../../service/authentication/crud.user';
import { ReportService } from  '../../service/report/report';
import { ListGiveDetailPage } from '../../modal/list-give-detail/list-give-detail.page';
import { SocialMedia } from "../../service/social-media/social.media";
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
    private loadingController: LoadingController,
    private modalController: ModalController,
    private socialMedia : SocialMedia,
    private crudProduct: CrudProduct,
    private report: ReportService,
    private validateProduct: ValidateProduct,
    private authService: AuthService,
    private crudUser : CrudUser
  ) { }
  colors = ["#3880ff","#0cd1e8","#7044ff","#10dc60","#ffce00","#f04141","#F0E68C","#FFB6C1","#20B2AA"];
  itemId = null;
  products : any;
  differentProducts : any;
  users : any;
  userSubmit : any;
  numberUserSubmit : any;
  disableBtn = true;
  hasLoad = false;
  nameSubmitBtn : string;
  userID : any;
  userGivenID : any;
  hasCreated = false;
  listReport : any;
  countSubmitClick = 0;
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

  //kiem tra nguoi dung co submit hay khong
  checkUserSubmitOrGive(){
    var checkGet;
    var checkGive;
    if(this.userSubmit.length > 0){
      for(var i =0;i<this.userSubmit.length;i++){   
        if(this.userSubmit[i].user == this.userID){
          this.disableBtn = true;
          this.nameSubmitBtn = "Đã đăng ký nhận";
        }else if(this.userSubmit[i].hasChosen == true){
          this.disableBtn = true;
          this.nameSubmitBtn = "Đã có người được chọn";
        }else{
          console.log("haha")
          checkGet = false;
        }
      }
    }else{
      checkGet = false;
    }
    for(var i =0;i<this.products.length;i++){   
      if(this.products[i].id == this.itemId){
        if(this.products[i].user == this.userID){
          this.disableBtn = true;
          this.nameSubmitBtn = "Bài đăng này là của bạn";
        }else{
          checkGive = false;
        }
      }
    }
    if(checkGive == false && checkGet == false){
      this.disableBtn = false;
      this.nameSubmitBtn = "Đăng ký nhận";
    }
  }
  
  getNumberUserSubmit(){
    this.numberUserSubmit = this.userSubmit.length;
  }

  getDifferentProducts(){
    this.differentProducts = [];
    this.shuffle(this.products);
    for(var i = 0;i<this.products.length;i++){
      if(this.products[i].id != this.itemId){
        this.differentProducts.push({
          id: this.products[i].id,
          loaisp: this.products[i].loaisp,
          tensp: this.products[i].tensp,
          img: this.products[i].img
        });
      }
    }
  }

  getUserGivenID(){
    for(var i = 0;i<this.products.length;i++){
      if(this.products[i].id == this.itemId){ 
        this.userGivenID = this.products[i].user;
      }
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
          status:e.payload.doc.data()['tinhtrangsp'],
          user:e.payload.doc.data()['user']
        };
      })
    });
    //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate']
        }
      })
    });
    
    //lay thong tin user submit
    this.crudProduct.read_GetProduct(this.itemId).subscribe(data => {
      this.userSubmit = data.map(e => {
        return {
          user:e.payload.doc.data()['user'],
          hasChosen:e.payload.doc.data()['hasChosen']
        };
      })
    });

    this.report.read_Report().subscribe(data=>{
      this.listReport = data.map(e => {
        return {
          masp:e.payload.doc.data()['masp'],
          reporterid:e.payload.doc.data()['reporterid'],
        };
      })
    })
    this.shuffle(this.colors);
  }
  ionViewDidEnter(){
    //lay thong tin user dang su dung app
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
    }
    this.getNumberUserSubmit();
    this.checkUserSubmitOrGive();
    this.getDifferentProducts(); 
    this.getUserGivenID();
    this.createContentShare();
  }
  //chuc nang hien thi report
  async showReportAllert() {
    var bool = false;
    for(var i =0;i<this.listReport.length;i++){
      if(this.listReport[i].masp == this.itemId){
        if(this.listReport[i].reporterid == this.userID){
          bool = true;
        }
      }
    }
    if(bool == true){
      this.report.ToastMessage("Bạn đã tố cáo bài đăng này");
    }else if(bool == false){
      const alert = await this.alertController.create({
        header: 'Xác nhận',
        subHeader: 'Chú ý: tố cáo sai sẽ bị phạt nhé !',
        message: 'Bạn có muốn report bài đăng',
        inputs: [
          {
            name: 'reportInput',
            type: 'text',
            placeholder: 'Nhập nội dung tố cáo'
          }
        ],
        buttons: [
          {
            text: 'Hủy',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Xác nhận',
            handler: data => {
              if(data.reportInput == ""){
                this.report.ToastMessage('Mời nhập nội dung tố cáo !');
              }else if(data.reportInput.length > 100){
                this.report.ToastMessage('Nội dung tố cáo không được quá 100 ký tự');
              }else{
                let record = {};
                record['content'] = data.reportInput;
                record['masp'] = this.itemId;
                var today = new Date();
                record['ngaytocao'] = today;
                record['reporterid'] = this.userID;
                record['userid'] = this.userGivenID;
                this.report.create_NewReport(record).then(res =>{
                  this.report.ToastMessage('Đã gửi,chờ admin duyệt tố cáo !');
                });
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }

  subjectShare : string;
  shareMessage : string;
  imageShare : string;
  urlShare : string;
  //tao content share fb
  createContentShare(){
    for(var i = 0;i<this.products.length;i++){
      if(this.products[i].id == this.itemId){
        this.subjectShare = null;
        this.shareMessage = this.products[i].tensp+" - "+this.products[i].note;
        this.imageShare = null;
        this.urlShare = "https://givegetshare.firebaseapp.com/home/"+this.products[i].id;
      }
    }
  }

  //chuc nang hien thi share
  async showShareAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chia sẻ',
      buttons: [
        {
          text: "Share on Facebook",
          role: "destructive",
          cssClass: " action-facebook",
          icon: "logo-facebook",
          handler: () => {
            this.socialMedia.share(
              "com.facebook.katana",
              "Facebook",
              "facebook",
              this.shareMessage,
              this.subjectShare,
              this.imageShare,
              this.urlShare
            );
          }
        },
        {
          text: "Share on Whatsup",
          role: "destructive",
          cssClass: " action-whatsup",
          icon: "logo-whatsapp",
          handler: () => {
            this.socialMedia.share(
              "com.whatsapp",
              "Whatsapp",
              "whatsapp",
              this.shareMessage,
              this.subjectShare,
              this.imageShare,
              this.urlShare
            );
          }
        },
        {
          text: "Share on Instagram",
          role: "destructive",
          cssClass: " action-instagram",
          icon: "logo-instagram",
          handler: () => {
            this.socialMedia.share(
              "com.instagram.android",
              "Instagram",
              "instagram",
              this.shareMessage,
              this.subjectShare,
              this.imageShare,
              this.urlShare
            );
          }
        },
        {
          text: "Share on Twitter",
          role: "destructive",
          cssClass: " action-twitter",
          icon: "logo-twitter",
          handler: () => {
            this.socialMedia.share(
              "com.twitter.android",
              "Twitter",
              "twitter",
              this.shareMessage,
              this.subjectShare,
              this.imageShare,
              this.urlShare
            );
          }
        },
        {
          text: "Share on other Social medias",
          role: "destructive",
          cssClass: " action-regular",
          icon: "share",
          handler: () => {
            this.socialMedia.share(
              "none",
              "Share",
              "none",
              this.shareMessage,
              this.subjectShare,
              this.imageShare,
              this.urlShare
            );
          }
        }
      ]
 
    });
    await actionSheet.present();
  }

  
  //chuc nang show toolbar
  showToolbar = false;
  countShuff = 0;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 300;
    }
  }

  //lay du lieu san pham de dang ky
  createGetData(){
    let record = {};
    record['user'] = this.userID;
    record['hasChosen'] = false; 
    record['phone'] = 
    this.disableBtn = true;
    this.crudProduct.add_GetProduct(this.itemId,record).then(resp =>{
      this.hasCreated = true;
      this.validateProduct.ToastGetSuccess();
      this.checkUserSubmitOrGive();
      this.getNumberUserSubmit();
      this.countSubmitClick ++;
    })  
  }
  //gui du lieu len firebase
  async submitGet(){
    const loading = await this.loadingController.create({
      message: 'Đang xử lý'
    });
    if(this.countSubmitClick < 1){
      await this.createGetData();
    }
    if(this.hasCreated == true){
      loading.dismiss();
    }
  }

  //show modal danh sach dang dang ky
  async presentModal() {
    const modal = await this.modalController.create({
      component: ListGiveDetailPage,
      componentProps: {
        "productID": this.itemId
      }
    });
    return await modal.present();
  }

}
