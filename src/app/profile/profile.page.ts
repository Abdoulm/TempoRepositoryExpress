import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData : any;
  userName: any;
  fireStoreData:any;
  constructor(
    public modalCtrl: ModalController,
    public router : Router,
    private db : AngularFirestore,
    private auth:AngularFireAuth,
    private taostr: ToastController
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user"));
   // console.log(this.userData.user.uid);
    console.log(this.userData);
    this.auth.authState.subscribe(user=>{
      if(user){      
        this.db.collection("users").doc(this.userData?.uid).valueChanges().subscribe(data=>{
          this.fireStoreData = data;
          console.log(this.fireStoreData);
          
     
        }) 
      }
      
    })
    



  }

  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    })

    return await modal.present();
  }

  async register() {
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    })

    return await modal.present();
  }
  getBack(){
    this.router.navigateByUrl("/home");
  }

  redirectToEditPage(){
    this.router.navigateByUrl("/edit-profile");
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
    this.router.navigate(['home']);
  }

  redirectToValide(){
    if(this.userData){
      this.router.navigate(['livraison-valide']);
    }else{
      this.presentToastColor();
    }
  }

  redirectToEnCour(){
    if(this.userData){
      this.router.navigate(['livraison-en-cour']);
    }else{
      this.presentToastColor();
    }
  }

  async presentToastColor() {
    const toast = await this.taostr.create({
      message: 'Veillez-vous connecter',
      duration: 3000
    });
    toast.present();
  }
}
