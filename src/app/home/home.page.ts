import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { SearchPage } from '../search/search.page';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
  catSlideOpts = {
    freeMode: true,
    slidesPerView:3.5,
    slidesOffsetBefore: 11,
    spaceBetwen:10
  };

  userLogin: any;
  
  categories: Observable<any[]>;
  // vedettes: Observable<any[]>;
  bestsellers:Observable<any[]>;

  slidePhoto: string[][];

  vedettes:any;

  bestsell:DocumentData[] = [];
  vedette:DocumentData[] = [];

  public folder: string;
  headers:any;
  firstId:any;
  catFid:any;
  catgrs:any;

  constructor(private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore, 
    public nav : NavController,
    private router : Router,
    private modalControler: ModalController) {
      // this.categories = this.firestore.collection('category').valueChanges();
      //this.bestsellers = this.firestore.collection('bestsellers').valueChanges();
      this.firestore.collection("category").valueChanges().subscribe(data=>{
        this.catgrs = data;
        this.firstId = data[0];
        this.catFid = this.firstId.id;
        console.log(this.firstId.id);
        
      })
      this.firestore.collection('vedette').valueChanges().subscribe(data=>{
        this.vedettes = data;
      
      });

      this.firestore.collection('header').valueChanges().subscribe(data=>{
        this.headers = data;
        console.log(this.headers);
      });


      this.firestore.firestore.collection("articles").where("promo", "!=", '').limit(3)
      .get()
      .then(querySnapshot=> {
        querySnapshot.forEach(doc=>{
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
  
          this.vedette.push(doc.data());
          console.log(this.bestsell);
          
    
        });

      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      

      this.firestore.firestore.collection("articles").where("promo", "==", '').limit(3)
      .get()
      .then(querySnapshot=> {
        querySnapshot.forEach(doc=>{
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
  
          this.bestsell.push(doc.data());
          console.log(this.bestsell);
          
    
        });

      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      
    }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.userLogin = JSON.parse(localStorage.getItem("user"));
    console.log(this.userLogin);


    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
      this.firestore.collection("users").doc(this.userLogin.uid).update({
        "token": token.value
      })
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  
    
  }

  async onInput(event){
    console.log(event.target.value);
    //this.router.navigate(['search'])
    const modal = await this.modalControler.create({
      component: SearchPage,
    })

    modal.onWillDismiss().then(dataReturned=>{
      const data = dataReturned.data;
      console.log('Received: ', data);

      
    });

    return await modal.present().then(_=>{

    })
    
  }



  onCancel(event){
    this.modalControler.dismiss();
    console.log("adou");
    
  }

  detailArticle(id, nom, photo, price, description){
    //this.slidePhoto =  photo;
    
    sessionStorage.setItem("vedetteId", id);
    //console.log(id);
    
    sessionStorage.setItem("vedetteNom", nom);
    sessionStorage.setItem("vedettePhoto", photo);
    sessionStorage.setItem("vedettePrice", price)
    sessionStorage.setItem("vedetteDesc", description)

    //this.nav.navigateForward("/item-detail/id")

  }

}
