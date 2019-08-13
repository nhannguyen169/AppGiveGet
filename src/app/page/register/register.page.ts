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
      { type: 'minlength', message: 'Mật khẩu tối thiểu 6 ký tự.' }
    ],
    'username': [
      { type: 'required', message: 'Yêu cầu nhập tên tài khoản.' },
      { type: 'minlength', message: 'Tên tài khoản tối thiểu 6 ký tự.' }
    ],
    'mssv': [
      { type: 'required', message: 'Yêu cầu nhập mã số sinh viên.' },
      { type: 'minlength', message: 'Mã số sinh viên cần tối thiểu 7 ký tự.' }
    ],
    'fullname': [
      { type: 'required', message: 'Yêu cầu nhập họ tên.' }
    ],
    'phone': [
      { type: 'required', message: 'Yêu cầu nhập số điện thoại.' },
      { type: 'minlength', message: 'Số điện thoại phải là 10 số' },
      { type: 'maxlength', message: 'Số điện thoại phải là 10 số' },
      { type: 'pattern', message: 'Số điện thoại không được chứa kí tự' }
    ],
    'khoa': [
      { type: 'required', message: 'Yêu cầu chọn khoa.' }
    ],
    'gender': [
      { type: 'required', message: 'Yêu cầu chọn giới tính.' }
    ],
  };

  khoa = [
  { value : "Công nghệ thông tin"},
  { value : "Kiến trúc"},
  { value : "Xây dựng"},
  { value : "Môi trường & Công nghệ sinh học"},
  { value : "Ngoại ngữ"},
  { value : "Quan hệ Công chúng – Truyền thông & Nghệ thuật"},
  { value : "Tài chính - Kế toán"},
  { value : "Luật"},
  { value : "Thương mại & Quản trị kinh doanh"},
  { value : "Mỹ thuật công nghiệp"},
  { value : "Kỹ thuật"},
  { value : "Du lịch"},
  { value : "Xã hội & Nhân văn  "},
  { value : "Y dược"},
  { value : "Đào tạo Văn hóa, Nghệ thuật & Truyền thông"},
  { value : "Khoa học cơ bản"}
  ];
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
      fullname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])),
      khoa: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gender: new FormControl('', Validators.compose([
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
    record['fullname'] = value.fullname;
    record['phone'] = value.phone;
    record['khoa'] = value.khoa;
    record['gender'] = value.gender;
    record['createDate'] = ucreatedate;
    record['rating'] = 0;
    record['numberUserRate'] = 0;
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
