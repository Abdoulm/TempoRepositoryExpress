import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public categories :Observable<any[]>;
  public subcategories :any;
  catSlideOpts = {
    freeMode: true,
    slidesPerView:2.8,
    slidesOffsetBefore: 11,
    spaceBetwen:10
  }
  categoryId: any;
  categoryIdData: any;
  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute
    
  ) { 
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // this.db.collection('category').valueChanges().subscribe((data)=>{
    //   //console.log(data);
      
    //   this.categories = data;
    //   console.log(this.categories)
    // });

    this.categories = this.db.collection('category').valueChanges();
    if(this.categoryId != null){
      this.db.collection("category").doc(this.categoryId).valueChanges().subscribe(cat=>{
        this.categoryIdData = cat;
        this.callBack(this.categoryIdData.nom, this.categoryId);
        
      });
      
    }
   console.log(this.categoryId);
   
  }

  callBack(categorieName, id){
    console.log(categorieName);
    console.log(id);
    
    this.db.collection('category').doc(id).collection(categorieName).valueChanges().subscribe((data)=>{
      this.subcategories = data;
      JSON.stringify(this.subcategories);
      console.log(data);
      
    });


    
  }


}
