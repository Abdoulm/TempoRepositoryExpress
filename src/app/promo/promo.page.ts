import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {

  promos:DocumentData[] = [];

  constructor(private firestore:AngularFirestore) {

    this.firestore.firestore.collection("articles").where("promo", "!=", '')
    .get()
    .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.promos.push(doc.data());
        console.log(this.promos);
        
  
      });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   }

  ngOnInit() {
  }

}
