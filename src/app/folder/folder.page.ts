 import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  catSlideOpts = {
    freeMode: true,
    slidesPerView:3.5,
    slidesOffsetBefore: 11,
    spaceBetwen:10
  };

  categories: Observable<any[]>;
  vedettes: Observable<any[]>;
  bestsellers:Observable<any[]>;

  slidePhoto: string[][];



  public folder: string;


  constructor(private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore, 
    public nav : NavController) {
      this.categories = this.firestore.collection('category').valueChanges();
      this.vedettes = this.firestore.collection('vedette').valueChanges();
      this.bestsellers = this.firestore.collection('bestsellers').valueChanges();
     }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }



  detailArticle(id, nom, photo, price, description){
    //this.slidePhoto =  photo;
    
    sessionStorage.setItem("vedetteId", id);
    console.log(id);
    
    sessionStorage.setItem("vedetteNom", nom);
    sessionStorage.setItem("vedettePhoto", photo);
    sessionStorage.setItem("vedettePrice", price)
    sessionStorage.setItem("vedetteDesc", description)

    this.nav.navigateForward("/article-detail/id")

  }

}
