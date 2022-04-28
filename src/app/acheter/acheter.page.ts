import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategorieService } from '../service/categorie.service';
import { ArticleService } from '../models/article.service';
import { map, finalize } from 'rxjs/operators' ; 

@Component({
  selector: 'app-acheter',
  templateUrl: './acheter.page.html',
  styleUrls: ['./acheter.page.scss'],
})
export class AcheterPage implements OnInit {
  INCRE = firebase.firestore.FieldValue.increment(+1);
  DECREMENT = firebase.firestore.FieldValue.increment(-1);
  total_price = firebase.firestore.FieldValue;
  pRef:any;

  Nquantite:number;
  Ntotal:number;
  nPrice:any;
  totalListe:any=[];

  public selectedIndex = 2;
  private currentUser: any;
  private incr: number;
  private totalArticle:number;
  TOTAL:number;
  public articles: any;
  categories: Observable<any[]>;
  articleId:any;
  buyData:any;
  fieldDataQauntiteAnTotal:any
  constructor(
    private fireAuth: AngularFireAuth,
    private router : Router,
    private db: AngularFirestore,
    private articleService: ArticleService,
    private categoryService: CategorieService,
    private route:ActivatedRoute
  ) {

    this.articleId = this.route.snapshot.paramMap.get("id");
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(this.currentUser.uid);
    
    this.selectedIndex = 1;
    this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(this.articleId).valueChanges().subscribe(data=>{
      this.buyData = data;
    })

   }

  ngOnInit() {
  }



  // getTotalArticle(){
  //   this.TOTAL= 0;
  //   this.db.collection(`panier`).doc(this.currentUser.uid)
  //   .collection("articles").snapshotChanges().subscribe((data)=>{
  //     data.forEach(snapshot=>{
        
  //       //  this.TOTAL += parseInt(snapshot.payload.doc.data().total);
  //       this.totalListe.push(parseInt(snapshot.payload.doc.data().total));
        
  //     });
  //     this.addAllTotal();
  //     console.log(this.TOTAL);
  //   });
  // }


 async newIncrementMethode(id){
    
   await this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id).valueChanges().subscribe(data=>{
      this.Nquantite = parseInt(data.quantite);
      this.nPrice = parseInt(data.price);

      console.log(this.Nquantite);
      console.log(this.nPrice);
      this.Ntotal = this.tota_price(this.Nquantite, this.nPrice);
    })
    

    console.log(this.Ntotal);
    // this.getTotalArticle();
    // this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id)
    // .valueChanges().subscribe((data)=>{
  
    //   this.articles = data;

    //   this.totalArticle = this.tota_price(this.incr, this.articles.price)
    //   // this.totalArticle = this.articles.total_price * this.incr;
      
    // });

    

   await this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id).update({
      "quantite": this.INCRE,
      // "total" : this.totalArticle,
     
  
    })
    this.updateDoc(id, 10);
    
  }

  newdDecrementMethode(id){
    
    this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id).valueChanges().subscribe(data=>{
      this.Nquantite = data.quantite;
    });
    if(this.Nquantite !== 1){
      
      this.db.collection("Buy").doc(this.currentUser.uid).collection("article").doc(id).update({
        "quantite": this.DECREMENT,
      })
    }
  }


  updateDoc(_id: any, _value: any) {
    this.pRef = this.db.collection("Buy").doc(this.currentUser.uid);
    let doc = this.pRef.collection('article', ref => ref.where('id', '==', _id));
    doc.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      console.log(_value);
      
      this.pRef.collection('article').doc(id).update({total: _value});
    });
  }

  tota_price(qt:number, mt:number): number{
    return qt * mt;
  }

}
