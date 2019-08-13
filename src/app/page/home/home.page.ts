import { Component, ViewChild,Injectable} from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { IonContent,NavController} from '@ionic/angular';
import { CrudProduct } from '../../service/firestore/crud.product';
import { CrudUser } from  '../../service/authentication/crud.user';
import { AuthService } from '../../service/authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
@Component({  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private navCtrl : NavController,
    private crudProduct: CrudProduct,
    private crudUser : CrudUser,
    private authService: AuthService
  ){}
  products : any;
  initializeProduct : any;
  hasSearch = false;
  userEmail: string;
  users: any;

  ngOnInit() {   
    //lay thong tin san pham
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
    this.crudUser.readUser().subscribe(data => {
      const navctrl =  this.navCtrl;
      data.map(e => {
        if(this.authService.userDetails().uid == e.payload.doc.data()['userID']){
          if(e.payload.doc.data()['blockAccount'] == true){
            navctrl.navigateRoot('/login');
            this.authService.logoutUser();
            this.authService.ToastMessage("Tài khoản bạn đã bị block do vi phạm điều lệ sử dụng ứng dụng !");
          }
        }
      })
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

  userID : any;
  ionViewDidEnter(){
    this.scrollToTop();  
  }
   //chuc nang scroll
   disableFab = true;
   onScroll($event: CustomEvent<ScrollDetail>) {
     if ($event && $event.detail && $event.detail.scrollTop) {
       const scrollTop = $event.detail.scrollTop;
       if(scrollTop >= 100){
        this.disableFab = false;
       }else{
        this.disableFab = true;
       }
     }
   }
  
   
}
