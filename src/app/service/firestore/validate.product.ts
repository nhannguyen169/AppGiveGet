import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })

export class ValidateProduct {

  constructor(public toastController: ToastController) {}

  async ToastImage() {
    const toast = await this.toastController.create({
      message: 'Chưa chọn ảnh',
      duration: 2000
    });
    toast.present();
  }
  async ToastName() {
    const toast = await this.toastController.create({
      message: 'Chưa nhập tên sản phẩm',
      duration: 2000
    });
    toast.present();
  }
  async ToastDescribe() {
    const toast = await this.toastController.create({
      message: 'Chưa nhập mô tả',
      duration: 2000
    });
    toast.present();
  }
  async ToastType() {
    const toast = await this.toastController.create({
      message: 'Chưa chọn loại sản phẩm',
      duration: 2000
    });
    toast.present();
  }
  async ToastMethod() {
    const toast = await this.toastController.create({
      message: 'Chưa chọn cách thức nhận',
      duration: 2000
    });
    toast.present();
  }
  async ToastStatus() {
    const toast = await this.toastController.create({
      message: 'Chưa chọn tình trạng sản phẩm',
      duration: 2000
    });
    toast.present();
  }
  async ToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Thành công! Vui lòng đợi admin duyệt bài',
      duration: 3000
    });
    toast.present();
  }
  async ToastGetSuccess() {
    const toast = await this.toastController.create({
      message: 'Đăng ký thành công',
      duration: 2000
    });
    toast.present();
  }


}