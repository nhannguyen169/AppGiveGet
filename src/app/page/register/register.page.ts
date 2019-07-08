import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/authentication/authentication.service';
import { NavController,ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
 
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
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController
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
    this.navCtrl.navigateForward('/menu/home');
  }
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.ToastMess("Tài khoản tạo thành công. Mời bạn xác nhận email !");
       this.authService.SendVerificationMail();
       this.goLoginPage();
     }, err => {
       console.log(err);
       this.ToastMess(err.message);
     })
  }
 
 

}
