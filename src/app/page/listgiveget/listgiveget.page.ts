import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listgiveget',
  templateUrl: './listgiveget.page.html',
  styleUrls: ['./listgiveget.page.scss'],
})
export class ListgivegetPage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  products = [
    {
      id: 1,
      name: 'One Question',
      type: 'Sách',
      user:'Nguyễn Văn A',
      date:'14/6/2019',
      note:'sách cũ không xài',
      img:'/assets/img-tmp/sp1.jpg'
    },
    {
      id: 2,
      name: 'A day for you sdsdsd',
      type: 'Sách cũ',
      user:'Nguyễn Văn B',
      date:'14/6/2019',
      note:'ai cần liên hệ',
      img:'/assets/img-tmp/sp2.jpg'
    },
    {
      id: 3,
      name: 'Java Script For Beginer',
      type: 'Sách',
      user:'Trần Văn A',
      date:'14/6/2019',
      note:'sách về lập trình ai cần liên hệ',
      img:'/assets/img-tmp/sp3.jpg'
    },
    {
      id:4,
      name: 'Sách lập trình WEB',
      type: 'Sách cũ',
      user:'Nguyễn Văn A',
      date:'14/6/2019',
      note:'Cần giao lại quyển lập trình cho ai mún',
      img:'/assets/img-tmp/sp4.jpg'
    },
    {
      id: 5,
      name: 'XPERIA',
      type: 'Điện Thoại',
      user:'Nguyễn Văn C',
      date:'14/6/2019',
      note:'liên hệ',
      img:'/assets/img-tmp/sp5.jpg'
    },
    {
      id: 6,
      name: 'Vợt cũ',
      type: 'Vợt',
      user:'Phạm Thế C',
      date:'14/6/2019',
      note:'Ai cần liên hệ',
      img:'/assets/img-tmp/sp6.jpg'
    }
  ] 
  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  async showReportAllert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: 'Bạn có muốn xoá !',
      buttons: ['Không', 'Có']
    });

    await alert.present();
  }
}
