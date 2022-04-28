import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../models/article.service';
import { CategorieService } from '../service/categorie.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.page.html',
  styleUrls: ['./user-cart.page.scss'],
})
export class UserCartPage implements OnInit {

  public isMenuEnabled:boolean = true;
  public selectedIndex = 2;
  private currentUser: any;
  private incr: number;
  private totalArticle:number;
  TOTAL:number;
  public articles: any;
  categories: Observable<any[]>;
  INCRE = firebase.firestore.FieldValue.increment(+1);
  DECREMENT = firebase.firestore.FieldValue.increment(-1);

  total_price = firebase.firestore.FieldValue;


  Nquantite:number;
  Ntotal:number;
  nPrice:any;
  totalListe:any=[];
  constructor(
    private fireAuth: AngularFireAuth,
    private router : Router,
    private db: AngularFirestore,
    private articleService: ArticleService,
    private categoryService: CategorieService

  ) {

    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(this.currentUser.uid);
    
    this.selectedIndex = 1;
    this.categories = this.db.collection("panier").doc(this.currentUser.uid).collection("articles").valueChanges();


    this.getTotalArticle();
   }

  ngOnInit() {



  }

   serviceAddMethode(event, id){
    event.stopPropagation();
    this.addToCart(event, id)

    const data={
      "quantite": this.INCRE,
      "total" : this.totalArticle,
    }

    try {
      this.categoryService.update(id, data).then(()=>{
        console.log("data update");
        // this.getTotalArticle();
        
      });
    } catch (error) {
      console.log(error);
      
    }

  }



  addToCart(event , id){
    if(this.currentUser){
      event.stopPropagation();
      this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id)
      .valueChanges().subscribe((data)=>{
    
        this.articles = data;
        console.log(this.articles);
        
        this.incr = this.articles.quantite +1;
        this.totalArticle = this.tota_price(this.incr, this.articles.price)
        //this.totalArticle = this.articles.total_price * this.incr;
        
      });
      // await this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).update({
  
      //   "quantite": this.incr,
      //   "total_price" : this.totalArticle,
      // });
    }


  }

  async removeToCart(id){
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id)
    .valueChanges().subscribe((data)=>{
  
      this.articles = data;
      if(this.articles.quantite !== 0){
        this.incr = this.articles.quantite -1;
        this.totalArticle = this.articles.total_price * this.incr;
      }
  
    });

    try{
      const data = {
        
      "quantite": this.INCRE,
      "total" : this.totalArticle,
      }

      await this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).update(data).then(()=>{
        console.log("update");
        this.getTotalArticle();
        
      }).catch((e)=>{
        console.log(e);
        
      });
    }catch(e){
      console.log(e);
      
    }


  }

  tota_price(qt:number, mt:number): number{
    return qt * mt;
  }

  async deletePanier(id){
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).delete().then((result)=>{
      console.log("delete with succes")
    });

  }

  // updateTest(id:any){
  //   this.db.collection("panier").doc(this.currentUser.uid).collection("articles", ref => ref.where("quantite", "==", this.incr).)
  // }

    
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

  // addAllTotal(){
  //   for(const total of this.totalListe){
  //     this.TOTAL +=total;
  //     // console.log(this.TOTAL);
  //   }
  //   this.totalListe =  [];
  // }



  async newIncrementMethode(id){
  
  
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id)
    .valueChanges().subscribe((data)=>{
  
      this.articles = data;

      this.totalArticle = this.tota_price(this.articles.quantite, this.articles.price)
      // this.totalArticle = this.articles.total_price * this.incr;
      console.log(typeof this.totalArticle);
      
    });
    
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).update({
      "quantite": this.INCRE,
      

  
    }).then(succes=>{
      this.addTotal(id, this.totalArticle);
    });
  }

  newdDecrementMethode(id){
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).valueChanges().subscribe(data=>{
      this.Nquantite = data.quantite;
    });
    if(this.Nquantite !== 1){
        
    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id)
    .valueChanges().subscribe((data)=>{
  
      this.articles = data;

      this.totalArticle = this.tota_price(this.articles.quantite, this.articles.price)
      // this.totalArticle = this.articles.total_price * this.incr;
      console.log(typeof this.totalArticle);
      
    });
      
      this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).update({
        "quantite": this.DECREMENT,
      }).then(succes=>{
        this.addTotal(id, this.totalArticle);
      })
    }
  }


  addTotal(id , total){

    this.db.collection("panier").doc(this.currentUser.uid).collection("articles").doc(id).update({
      "total" : total
    })
  }





}
