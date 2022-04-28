import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ArticleService } from '../models/article.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  public panierRef: any;
  currentUser: any;
  articleRef: AngularFirestoreCollection<ArticleService> = null;

  constructor(private db : AngularFirestore) { 
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(this.currentUser.uid);
    this.articleRef = this.db.collection("panier").doc(this.currentUser.uid).collection("articles");
    
  }
  public async update(id:string, data:any): Promise<void>{
    await this.articleRef.doc(id).update(data);
  }
}
