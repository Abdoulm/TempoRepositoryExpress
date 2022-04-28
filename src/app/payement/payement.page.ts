import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.page.html',
  styleUrls: ['./payement.page.scss'],
})
export class PayementPage implements OnInit {
  private currentUser: any;
  private userInfo:any;
  currentUserData:any;
  public collectionSize:number;
  public collectionData:any;
  categories: Observable<any[]>;
  totalListe:any=[];
  TOTAL:number;
  checked:boolean=false;
  
  constructor(private router: Router,
    private alertCtrl: AlertController,
    private db : AngularFirestore,
    private toastController: ToastController,
    public loadingCtrl: LoadingController) { 
 
      this.currentUser = JSON.parse(localStorage.getItem("user"));
      this.getTotalArticle();
      console.log(this.currentUser.uid);
      this.categories = this.db.collection("panier").doc(this.currentUser.uid).collection("articles").valueChanges();
      this.db.collection("users").doc(this.currentUser.uid).valueChanges().subscribe(data=>{
        this.userInfo = data;
      
        if(this.userInfo.adresse == ""){
          this.presentPrompt();
        }
      });
    }

  ngOnInit() {
      
 
  }


  async presentPrompt() {

    let alert = this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'adresse de livraison',
      inputs: [
        {
          name: 'adresse',
          placeholder: 'adresse'
        },
        {
          name: 'localite',
          placeholder: 'pays',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'quitter',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'accepter',
          handler: data => {
            if (data.adresse && data.localite  !== "") {
              console.log(data);
              this.db.collection("users").doc(this.currentUser.uid).update({
                adresse : data.adresse,
                localite: data.localite
              })
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    (await alert).present();
  }

  async payWithOrange(){
    


    if(this.userInfo.telephone == ""){
    let alert = this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'numero de payement',
    inputs: [
      {
        name: 'numero',
        placeholder: 'telephone',
        type:'number'
      },

    ],
    buttons: [
      {
        text: 'quitter',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'accepter',
        handler: data => {
          if (data.numero !== "") {
            console.log(data);

            this.db.collection("users").doc(this.currentUser.uid).update({
              telephone : data.numero,
            });
            this.presentAlertConfirm();
          } else {
            // invalid login
            return false;
          }
        }
      }
    ]
  });
    (await alert).present();
  }else{
    this.presentAlertConfirm();
      console.log("popup de confirmation de payement!!!!!");
      
  }
  

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Payement validé ',
      duration: 3000
    });
    toast.present();
  }

  public async updateField(){
    const loader = this.loadingCtrl.create({
      message: "Patienter svp...",
  
    });
    (await loader).present();
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
          console.log("okayyyyyyyy");
          this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(data[i].id).delete();
          this.router.navigate(['succes']);
        });
      }
      for(let i = 0 ; i < this.collectionSize; i++){
        this.db.collection("users").doc(this.currentUser.uid).valueChanges().subscribe(data=>{
            
        
          this.db.collection("commands").doc(this.currentUser.uid).collection("articles").doc(this.collectionData[i].id).update({
            "adresse":data["adresse"],
            "localite":data["localite"],
            "checked": this.checked,
          });
          
        })
      }
      
    });

  (await loader).dismiss();

  }



  getTotalArticle(){
    this.TOTAL= 0;
    this.db.collection(`panier`).doc(this.currentUser.uid)
    .collection("articles").snapshotChanges().subscribe((data)=>{
      data.forEach(snapshot=>{
        
        this.TOTAL += parseInt(snapshot.payload.doc.data().total);
        console.log(this.TOTAL);
        
        // this.totalListe.push(parseInt(snapshot.payload.doc.data().total));
        // console.log(this.totalListe);
        
        
      });
      // this.addAllTotal();
      // console.log(this.TOTAL);
    });
  }

  addAllTotal(){
    for(const total of this.totalListe){
      this.TOTAL += total;
      console.log(this.TOTAL);
    }
    this.totalListe =  [];
  }

  confirm(){
    this.router.navigateByUrl("/confirm");
  }

}
