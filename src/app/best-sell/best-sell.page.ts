import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-best-sell',
  templateUrl: './best-sell.page.html',
  styleUrls: ['./best-sell.page.scss'],
})
export class BestSellPage implements OnInit {
  bestSelles:DocumentData[] = [];


  constructor(private firestore:AngularFirestore) {
    this.firestore.firestore.collection("articles").where("promo", "==", '')
    .get()
    .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.bestSelles.push(doc.data());
        console.log(this.bestSelles);
        
  
      });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   }

  ngOnInit() {
  }

}
