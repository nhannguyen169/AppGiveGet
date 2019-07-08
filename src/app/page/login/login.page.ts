import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController,ToastController } from '@ionic/angular';
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
    public toastController: ToastController
 
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@vanlanguni.vn+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
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
      { type: 'minlength', message: 'Mật khẩu cần trên 5 ký tự.' }
    ]
  };
 
  async ToastError(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 2000
    });
    toast.present();
  }

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      if (res.user.emailVerified !== true) {
        this.ToastError("Tài khoản chưa được kích hoạt.Vui lòng kiểm tra email");
      }else{
        console.log(res);
        this.navCtrl.navigateForward('/menu/home');
      }
    }, err => {
      this.ToastError(err.message);
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
}
