import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  products = [
    {
      id: 1,
      name: 'One Question',
      type: 'Sách',
      user:'Nguyễn Văn A',
      date:'14/6/2019',
      note:'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s',
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
  itemId = null;
  constructor(private activatedRoute: ActivatedRoute,public alertController: AlertController,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('itemid');
  }
  async showReportAllert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      subHeader: '',
      message: 'Bạn có muốn report bài đăng !',
      buttons: ['Không', 'Có']
    });

    await alert.present();
  }
  async showShareAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chia sẻ',
      buttons: [{
        text: 'Facebook',
        role: 'destructive',
        icon: 'logo-facebook'
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 300;
    }
  }
}
