import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PanierService } from '../panier.service';
import { KeyValue } from '@angular/common';
import firebase from 'firebase/compat/app';
import { createAnimation, Animation } from '@ionic/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})


export class ItemDetailPage implements OnInit {
  @ViewChild('animatedIcon', { read: ElementRef }) animatedIcon: ElementRef;

  public favStateOn = false;
  public favOnAnimation: Animation;
  public favOffAnimation: Animation;

  buttonTextState = 'shown';
  // The text currently being show
  buttonText = "ADD TO CART";
  // The text that will be shown when the transition is finished
  transitionButtonText = "ADD TO CART";



  selectedSize: number;
  selectedColor:number;
  activeVariation: string;
  item: Observable<any[]>;

  nom: any;
  id_article: any;
  price: string;
  description:string;
  photo:any;

  itemName: string;
  vedettePhoto: any;
  itemPrice:string;
  itemPromo:string;
  ListePhoto :Observable<any[]>;
  itemDesc: string;
  currentUser:any;
  articleId : any;
  taille :string
  couleur: string;

  likesCount:any;
  isLiked:any;

  size:any;
  color:any;

  constructor(
    private animatioCntrl: AnimationController,
    public nav : NavController,
    public db: AngularFirestore,
    public router: Router,
    public servicePanier: PanierService,
    public route: ActivatedRoute,
    private taostr: ToastController,
    public firestoreService: AngularFirestoreModule,
    public loadingCtrl: LoadingController
  ) { 
    // this.vedettePhoto = sessionStorage.getItem("vedettePhoto");
    // this.vedetteId = sessionStorage.getItem("vedetteId");
    // this.vedetteNom = sessionStorage.getItem("vedetteNom");
    // this.vedettePrice = sessionStorage.getItem("vedettePrice");
    // this.vedetteDesc = sessionStorage.getItem("vedetteDesc");
   

  }

  // ngAfterViewInit() {
  //   this.favOnAnimation = createAnimation('')
  //   .addElement(this.animatedIcon.nativeElement)
  //   .duration(500)
  //   .keyframes([
  //     { offset: 0, transform: 'scale(1)', opacity: '0.4' },
  //     { offset: 0.5, transform: 'scale(1.8)', opacity: '0.8' },
  //     { offset: 1, transform: 'scale(1)', opacity: '1' },
  //   ]);

  //   this.favOffAnimation = createAnimation('')
  //   .addElement(this.animatedIcon.nativeElement)
  //   .duration(500)
  //   .keyframes([
  //     { offset: 0, transform: 'scale(0.8)', opacity: '0.4' },
  //     { offset: 0.5, transform: 'scale(0.5)', opacity: '0.8' },
  //     { offset: 1, transform: 'scale(1)', opacity: '1' }
  //   ]);
  // }

  
  // animate(): void {
  //   if (this.favStateOn) {
  //     this.favOnAnimation.stop();
  //     this.favOffAnimation.play();
  //   } else {
  //     this.favOffAnimation.stop();
  //     this.favOnAnimation.play();
  //   }
  //   this.favStateOn = !this.favStateOn;
  // }
  ngOnInit() {
    this.activeVariation = 'size';
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(this.articleId);
    


    
    this.db.collection('articles').doc<any>(this.articleId).valueChanges().subscribe(data =>{
      console.log("---------------"+data);
      this.item =  data;
      this.itemName = data.nom,
      this.itemDesc = data.description,
      this.itemPrice = data.price,
      this.itemPromo = data.promo,
      this.ListePhoto = data.photo;
      this.size = data?.size;
      this.id_article = data.id;
      console.log(data?.size);
      
      this.color = data?.color;
      
    });

    this.getLikesCount(this.articleId);

  }
  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }
  changeSize(size: number) {
    this.selectedSize = size;
    console.log(this.selectedSize);

    
    
  }

  changeColor(color: number){
    this.selectedColor = color;

    console.log(this.couleur);

    
    console.log(this.selectedColor);
    
  }

  /**
   * 
   * @param id Add Like Methode
   */
  async addLike(id){
    if(this.currentUser){
      
      this.db.collection("Likes").doc(id).collection("item").doc(this.currentUser.uid).valueChanges().subscribe(like=>{
  
        console.log(like);
        this.isLiked = like;
  
      });
  
      if(this.isLiked){
        this.db.collection("Likes").doc(id).collection("item").doc(this.currentUser.uid).delete();
      }else if(!this.isLiked){
        this.db.collection("Likes").doc(id).collection("item").doc(this.currentUser.uid).set({
          "isLiked": true,
        });
      }
    }else{
      const toast = this.taostr.create({
        message: 'Veillez vous connecter',
        duration: 3000
      });
      (await toast).present();
    }

    this.getLikesCount(id);
  }


  /**
   * 
   * @param id Get Articles Like Count
   */
  getLikesCount(id){
    this.db.collection("Likes").doc(id).collection("item").snapshotChanges().subscribe(count=>{
      console.log(count.length);
      this.likesCount = count.length;
      
    });
    if(this.currentUser){
      this.db.collection("Likes").doc(id).collection("item").doc(this.currentUser.uid).valueChanges().subscribe(like=>{

        console.log(like);
        this.isLiked = like;
  
      });
    }

  }

  getBack(){
    this.router.navigateByUrl("/home");
  }




  /**
   * Methode to Add Item to Cart
   */
  async addItemToCart(){


    if(this.currentUser){
  
      if(!this.color[this?.selectedColor]){
        this.presentToastColor();
        
      }else if(!this.size[this?.selectedSize]){
        this.presentToastSize();
      }else{

        this.showLoading();
        this.db.collection(`panier`).doc(this.currentUser.uid).collection("articles").doc(this.articleId).set({
          "id": this.articleId,
          "nom" : this.itemName,
          "description": this.itemDesc,
          "etat":"activer",
          "price": this.itemPrice,
          "photo":this.ListePhoto,
          "quantite":1,
          "total":this.itemPrice,
          "likes": this.likesCount,
          "color":this.color[this?.selectedColor],
          "size":this.size[this?.selectedSize]
        }).then(succes=>{
          this.dismiss();
          this.displayToast();
        })
      }
    }else{
      const toast = this.taostr.create({
        message: 'Veillez vous connecter',
        duration: 3000
      });
      (await toast).present();
      this.router.navigate(['profile']);
    }

  }


  /**
   * Loading Message to wait 
   * 
   */
  async showLoading(){
    const loader = this.loadingCtrl.create({
      message: "Patienter svp...",
  
    });
    (await loader).present();
  }

  dismiss(){
    this.loadingCtrl.dismiss();
  }


  /**
   * Toast is display is Item is add to cart
   */
  displayToast() {
    
    // Stop multiple toasts 
    try {
      this.taostr.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
    this.taostr.create({
      message: 'ajouter au panier',
      position: 'top',
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          icon: 'cart',
          handler: () => {
            console.log('');
          }
        }, {
          side: 'end',
          text: 'Close',
          role: 'quitter',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

  async presentToastColor() {
    const toast = await this.taostr.create({
      message: 'selectionner une couleur',
      duration: 3000
    });
    toast.present();
  }

  async presentToastSize() {
    const toast = await this.taostr.create({
      message: 'selectionner une taille',
      duration: 3000
    });
    toast.present();
  }

  async directBuy(id){

    if(this.currentUser){
  
      if(!this.color[this?.selectedColor]){
        this.presentToastColor();
        
      }else if(!this.size[this?.selectedSize]){
        this.presentToastSize();
      }else{
        
        this.showLoading();
       await this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id).set({
          "id": this.articleId,
          "nom" : this.itemName,
          "description": this.itemDesc,
          "etat":"activer",
          "price": this.itemPrice,
          "photo":this.ListePhoto,
          "quantite":1,
          "total":this.itemPrice,
          "likes": this.likesCount,
          "color":this.color[this?.selectedColor],
          "size":this.size[this?.selectedSize]
        }).then(succes=>{
    
          this.dismiss();
          this.router.navigate([`/acheter/${this.articleId}`]);
        }
        );
    
      }
      }
    }  

}
