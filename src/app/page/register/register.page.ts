import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/authentication/authentication.service';
import { NavController,ToastController,LoadingController  } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CrudUser } from  '../../service/authentication/crud.user';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  users: any;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Yêu cầu nhập email.' },
      { type: 'pattern', message: 'Mời bạn nhập đúng địa chỉ email văn lang.' }
    ],
    'password': [
      { type: 'required', message: 'Yêu cầu nhập mật khẩu.' },
      { type: 'minlength', message: 'Mật khẩu cần trên 5 ký tự.' }
    ],
    'username': [
      { type: 'required', message: 'Yêu cầu nhập tên tài khoản.' },
      { type: 'minlength', message: 'Tên tài khoản cần trên 6 ký tự.' }
    ],
    'mssv': [
      { type: 'required', message: 'Yêu cầu nhập mã số sinh viên.' },
      { type: 'minlength', message: 'Mã số sinh viên cần trên 7 ký tự.' }
    ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private crudUser : CrudUser,
    private loadingController: LoadingController
  ) {}
 
  ngOnInit(){

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@vanlanguni.vn+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      mssv: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
    });

    //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          username: e.payload.doc.data()['username'],
          mssv: e.payload.doc.data()['mssv']
        };
      })
    });
  }
 
  async ToastMess(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }
  goLoginPage(){
    this.navCtrl.navigateForward('/login');
  }

  CreateRecord(value,uid,ucreatedate) {
    let record = {};
    record['userID'] = uid;
    record['email'] = value.email;
    record['mssv'] = value.mssv;
    record['username'] = value.username;
    record['createDate'] = ucreatedate;
    this.crudUser.createUser(record).then(resp => {
      console.log(resp);
      this.ToastMess("Tài khoản tạo thành công. Mời bạn xác nhận email !");
      this.authService.SendVerificationMail();
      this.goLoginPage();
    })
      .catch(error => {
        console.log(error);
      });
  }

  async registerWithEmailPassword(value){
    const loading = await this.loadingController.create({
      message: 'Đang đăng ký'
    });
    await loading.present();
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.CreateRecord(value,this.authService.userDetails().uid,this.authService.userDetails().metadata.creationTime);
       loading.dismiss();
     }, err => {
       console.log(err);
       loading.dismiss();
       this.ToastMess(err.message);
     })
  }
  tryRegister(value){
    for(var i =0;i<this.users.length;i++){   
      if(this.users[i].username == value.username){
        this.ToastMess("Tài khoản đã có người sử dụng");
      }else if(this.users[i].mssv == value.mssv){
        this.ToastMess("Mã số sinh viên đã được tạo");
      }else{
        this.registerWithEmailPassword(value);
      }
    }
  }

 
 

}
