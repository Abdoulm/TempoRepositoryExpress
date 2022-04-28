import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import { UserAuthService } from '../user-auth.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{
  countryJson = environment.CountryJson;
  OTP: string = '';
  code: any;
  displayName:any;
  phoneNo:any;
  password:any;
  CountryCode:any='+223'
  showOTPInput:boolean= false;
  otpMessage: string='Veillez soumettre le code reçu';
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  user : any;
  authState = new BehaviorSubject(false);
  



  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private userAuth : UserAuthService,
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,

  ) { 

  }
  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user ? user : null;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }


  loginGoogle() {
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(userData=>{
      console.log("sign with succes");
      firebase.auth().onAuthStateChanged(function(user){
        if(!user){

          this.db.collection(`/users`).doc(userData.user.uid).set({
            id : userData.user.uid,
            fullName : userData.user.displayName,
            telephone: "",
            adresse: "",
            email: userData.user.email,
            profileImg: "https://firebasestorage.googleapis.com/v0/b/express-market-57a5f.appspot.com/o/profileImg%2Favatar%20(1).svg?alt=media&token=52affa77-f354-4860-8f40-028472f6269e",
            etat:"ACTIVER",
            password: "",
            localite:"",
            });
            this.saveInStorage();

        }else{
          this.db.collection(`/users`).doc(userData.user.uid).set({
            id : userData.user.uid,
            fullName : userData.user.displayName,
            telephone: "",
            adresse: "",
            email: userData.user.email,
            profileImg: "https://firebasestorage.googleapis.com/v0/b/express-market-57a5f.appspot.com/o/profileImg%2Favatar%20(1).svg?alt=media&token=52affa77-f354-4860-8f40-028472f6269e",
            etat:"ACTIVER",
            password: "",
            localite:"",
            });
            this.saveInStorage();
        }
      });

      }).catch(e=>{
        console.log(e);
        
      });
  }

  redirectToHome(){
    this.router.navigate(['home'])
  }

  saveInStorage(){
    this.fireAuth.authState.subscribe((user)=>{
      this.user = user ? user : null;
           
      
      this.authState.next(true);
      this.router.navigate(['profile']);

      // this.storage.set('user_info', user).then((response)=>{
      //   console.log("user___info response" + response);
        
      //   this.authState.next(true);
      //   this.router.navigate(['profile']);

      // });
    });
    this.redirectToHome();
  }


  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event){
    this.CountryCode = $event.detail.value;
    console.log(this.CountryCode);
    
  }
  

  signinWithPone($event){
    console.log('country', this.recaptchaVerifier);
    console.log(this.phoneNo);
    console.log(this.displayName);
    

    if(this.phoneNo && this.CountryCode){
      this.userAuth.signInWithPhoneNumber(this.recaptchaVerifier,  this.CountryCode + this.phoneNo).then(
        success=>{

          this.otpVerification();
        }
      ).catch(e=>{
        console.log(e);
        
      });
    }
    
  }

  isAuthenticated(){
    return this.fireAuth.authState.subscribe((logInfo)=>{
      console.log(logInfo);
      
    });
  }



  async showSuccess(){
    const alert = await this.alertController.create({
      header:'Succes',
      buttons: [
        {
          text: 'Ok',
          handler: (res)=>{
            alert.dismiss();
            
            this.modalCtrl.dismiss();
            this.router.navigate(['profile']);
          }
        }
      ]
    });
    alert.present();
  }


  async otpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter code',
      backdropDismiss: false,
      inputs:[
        {
          name:'otp',
          type:'text',
          placeholder:'Entre le code',
        }
      ],
      buttons: [{
        text:'Enter',
        handler:(res)=>{
          this.userAuth.enterVerificationCode(res.otp).then(
            userData=>{
              // firebase.auth().onAuthStateChanged(function(user){
              //   if(!user){

                  this.db.collection(`/users`).doc(userData.uid).set({
                    id : userData.uid,
                    fullName : "",
                    telephone: this.phoneNo,
                    localite:"",
                    adresse: "",
                    email: "",
                    profileImg:"",
                    etat:"ACTIVER",
                    password: this.password
                    }).then((result)=>{
                      this.showSuccess();
                    });
              //   }else{
              //     this.showSuccess();
              //   }

              // })
              // firebase.auth().onAuthStateChanged(function(user){
                              
              // });
              this.showSuccess();
              localStorage.setItem("user_data", JSON.stringify(userData));
              console.log(userData.uid);
              //this.router.navigateByUrl('/home');
              
            }
          );
        }
      }]
    });
    await alert.present();
  }


   dismiss() {
    return this.modalCtrl.dismiss();
  }


}


