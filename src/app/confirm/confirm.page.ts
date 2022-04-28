import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategorieService } from '../service/categorie.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  private currentUser: any;
  categories: Observable<any[]>;
  private isPaying:boolean=false;
  public collectionSize:number;
  public collectionData:any;
  cardForm: FormGroup;
  constructor(public alertCtrl: AlertController,
    private toastController: ToastController,
     private router: Router,
     private fb: FormBuilder,
     private categoryService: CategorieService,
     private db: AngularFirestore) { }

  ngOnInit(

  ) {

    this.cardForm = this.fb.group({
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expDate: ['', Validators.required],
      cvvNo: ['', Validators.required]

    });


    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(this.currentUser.uid);
    
    
    this.categories = this.db.collection("panier").doc(this.currentUser.uid).collection("articles").valueChanges();
    
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Payement validé ',
      duration: 3000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmer Payement!',
      message: '<strong>Voulez vous confirmer votre payement ?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.updateField();
            this.presentToast()
          }
        }
      ]
    });

    await alert.present();
  }


  changePayingState(){
    
    this.isPaying = true;
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").get()
    .subscribe(function(querySnapshot) {

      this.updateField(querySnapshot.docs[0].id);
      // this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(querySnapshot.docs[0].id).update({
      //   'isPaying': this.isPaying,
      // })
        
        // doc.data() is never undefined for query doc snapshots

        console.log("id",querySnapshot.docs[0].id);
        
    console.log(querySnapshot);
    
  });

    // this.db.collection(`panier`).doc(this.currentUser.uid)
    // .collection("articles").snapshotChanges().subscribe((data)=>{
    //   data.forEach(snapshot=>{
      
        // this.db.collection('panier').doc(this.currentUser.uid)
        // .collection('articles').doc(snapshot.payload.doc.data().id).update({
        //   'isPaying': this.isPaying,
        // })

        
    //      //this.TOTAL += parseInt(snapshot.payload.doc.data().total);
        
    //   });
    // });
  }

  public updateField(){
    this.categories.subscribe(data=>{
      this.collectionData = data;
      this.collectionSize = data.length;
      for(let i=0 ; i < data.length ; i++){

        this.db.collection("commands").doc(this.currentUser.uid).collection("articles").doc(data[i].id).set({
          "nom":data[i].nom,
          "id":data[i].id,
          "description":data[i].description,
          "price":data[i].price,
          "etat":data[i].etat = "créer",
          "photo":data[i].photo,
          "quantiter":data[i].quantite,
          "total":data[i].total,
          "color":data[i].color,
          "size":data[i].size,
          "isPaying":data[i].isPaying= true,

        }).then(e=>{
          this.db.collection("Commandes").doc(data[i].id).set({
            "nom":data[i].nom,
            "id":data[i].id,
            "description":data[i].description,
            "price":data[i].price,
            "etat":data[i].etat = "créer",
            "photo":data[i].photo,
            "quantiter":data[i].quantite,
            "total":data[i].total,
            "color":data[i].color,
            "size":data[i].size,
            "isPaying":data[i].isPaying= true,
          })
          console.log("okayyyyyyyy");
          this.router.navigate(['succes'])
        });
      }
      for(let i = 0 ; i < this.collectionSize; i++){
        this.db.collection("users").doc(this.currentUser.uid).valueChanges().subscribe(data=>{
            console.log(this.collectionData[i].id);
            
          this.db.collection("Commandes").doc(this.collectionData[i].id).update({
            "adresse":data["adresse"],
            "localite":data["localite"]
          });
          
          this.db.collection("commands").doc(this.currentUser.uid).collection("articles").doc(this.collectionData[i].id).update({
            "adresse":data["adresse"],
            "localite":data["localite"]
          });



          // this.db.collection("commandes").doc(this.collectionData[i].id).update({
          //   "adresse":data["adresse"],
          //   "localite":data["localite"]
          // });
          
        })
      }
      
    })

  

  }
  goBack(){
    this.router.navigate(['user-cart']);
  }
}
