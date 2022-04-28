import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-livraison-valide',
  templateUrl: './livraison-valide.page.html',
  styleUrls: ['./livraison-valide.page.scss'],
})
export class LivraisonValidePage implements OnInit {
  LivraisonValide:DocumentData[]= [];
  private currentUser: any;
  public commandSize: number;
  public commandListe:any;
  constructor(public db: AngularFirestore) {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.db.firestore.collection("commands").doc(this.currentUser.uid).collection("articles").where("etat", "==", 'livrer')
    .get()
    .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.LivraisonValide.push(doc.data());
        console.log(this.LivraisonValide);
        this.commandSize = this.LivraisonValide.length;
        
  
      });

      
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   }

  ngOnInit() {
  }

}
