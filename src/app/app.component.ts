import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import {menuController} from '@ionic/core'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  pushes: any = [];
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;
  private userData:any;
  private userdata: any;
  
  constructor(public router: Router,
    private platform:Platform,
    private toastr: ToastController,
    private alertCtrl: AlertController,
    private fireAuth: AngularFireAuth) {

    }




  ngOnInit(): void {
    this.selectedIndex = 1;
    this.fireAuth.authState.subscribe((data)=>{
      console.log(data);
      this.userdata = data;
      JSON.stringify(localStorage.setItem("auth", this.userData))
    })
    var data = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userData = data;
    console.log(this.userData);
    

    
  }

  navigate(path, selectedId){
    this.selectedIndex = selectedId;
    this.router.navigateByUrl(path)
  }

  close(){
    menuController.toggle();
  }

  async logout(){

  let alert = this.alertCtrl.create({
    message: 'Voudriez-vous vous deconnecter?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'confirmer',
        handler: () => {
          console.log('signOut comfirme');
          this.fireAuth.signOut().then(()=>{
          const toat = this.toastr.create({
            
          })
          localStorage.removeItem("user");
          this.router.navigate(['home'])
          this.close();
        }).catch(e=>{
          console.log(e);
          
        })
        }
      }
    ]
  });
  (await alert).present();

    
  
  }

  giveAccess(){
    if(this.userdata){
      this.router.navigate(['user-cart']);
    }else{
      this.router.navigate(['profile']);
    }
  }

  giveAccessCommande(){
    if(this.userdata){
      this.router.navigate(['commande']);
    }else{
      this.router.navigate(['profile']);
    }
  }
  


}
