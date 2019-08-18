import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { AuthService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController
 
  ) { }
 
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@vanlanguni.vn+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Yêu cầu nhập email.' },
      { type: 'pattern', message: 'Mời bạn nhập đúng địa chỉ email văn lang.' }
    ],
    'password': [
      { type: 'required', message: 'Yêu cầu nhập mật khẩu.' },
      { type: 'minlength', message: 'Mật khẩu tối thiểu 6 ký tự.' }
    ]
  };
 
  async ToastError(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 2000
    });
    toast.present();
  }

  async loginUser(value){
    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập'
    });
    await loading.present();
    this.authService.loginUser(value)
    .then(res => {
      if (res.user.emailVerified != true) {
        loading.dismiss();
        this.ToastError("Tài khoản chưa được kích hoạt.Vui lòng kiểm tra email");
      }else{
        console.log(res);
        loading.dismiss();
        this.navCtrl.navigateRoot('/tabs/menu');
      }
    }, err => {
      loading.dismiss();
      this.ToastError(err.message);
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
}
