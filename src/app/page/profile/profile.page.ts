import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../../service/authentication/authentication.service';
import { CrudUser } from  '../../service/authentication/crud.user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('slides') slider: IonSlides;
  segment = 0;

  messages = [
    {
      mess : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      mess : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
      mess : "but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
      mess : "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
    },
  ]
  users : any;

  constructor(
    private authService: AuthService,
    private crudUser : CrudUser
  ){}
  userEmail : any;
  userID : any
  userDateCreate : any;
  ngOnInit() {  
     //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          mssv: e.payload.doc.data()['mssv']
        }
      })
    });
    if(this.authService.userDetails()){
      this.userID = this.authService.userDetails().uid;
      this.userEmail = this.authService.userDetails().email;
      this.userDateCreate = this.authService.userDetails().metadata.creationTime;
    }
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
 
  
}
