import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userData : any;
  userName: any;
  public fireStoreData:FormGroup;
 

  constructor(private db:AngularFirestore,
    public fb: FormBuilder,
    private toastController: ToastController) { 
    this.userData = JSON.parse(localStorage.getItem("user"));
    // console.log(this.userData.user.uid);
     console.log(this.userData);
     this.db.collection("users").doc(this.userData.uid).valueChanges().subscribe(data=>{
       this.fireStoreData.setValue(data);
       console.log(this.fireStoreData);
       
     });    

  }

  ngOnInit() {
    this.fireStoreData = this.fb.group({
      fullName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      telephone: [''],
      password: [''],
      localite:[''],
      etat: [''],
      profileImg: [''],
      adresse: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      id: ['']
    });
    console.log(this.fireStoreData.value);
  }

  imageSelect(event){

  }

  editProfile(){
    if(this.fireStoreData.value.profileImg == null){
      this.db.collection("users").doc(this.userData.uid).update({

        fullName: this.fireStoreData.value.fullName,
        adresse: this.fireStoreData.value.adresse,
        telephone: this.fireStoreData.value.telephone,
        
      }).then(succes=>{
        this.showLongToast();
      })
    }else{
      this.db.collection("users").doc(this.userData.uid).update({
        profileImg: this.fireStoreData.value.profileImg,
        fullName: this.fireStoreData.value.fullName,
        email: this.fireStoreData.value.email,
        localite:this.fireStoreData.value.localite,
        adresse: this.fireStoreData.value.adresse,
        telephone: this.fireStoreData.value.telephone,
      }).then(succes=>{
        this.showLongToast();
      })
    }

    }

   async showLongToast() {
    const toast = await this.toastController.create({
      message: 'Profile mis à jour',
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }  


}
