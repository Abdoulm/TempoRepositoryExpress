import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-livraison-en-cour',
  templateUrl: './livraison-en-cour.page.html',
  styleUrls: ['./livraison-en-cour.page.scss'],
})
export class LivraisonEnCourPage implements OnInit {

  public LivraisonEnCour: DocumentData[] = [];
  private currentUser: any;
  public commandSize: number;
  public commandListe:any;
  constructor(public db: AngularFirestore) { 
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.db.firestore.collection("commands").doc(this.currentUser.uid).collection("articles").where("etat", "==", 'encours')
    .get()
    .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.LivraisonEnCour.push(doc.data());
        console.log(this.LivraisonEnCour);
        this.commandSize = this.LivraisonEnCour.length;
        
  
      });

      
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  ngOnInit() {
  }

}
