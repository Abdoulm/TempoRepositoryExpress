import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {
  public commands: DocumentData[] = [];
  public firebase_Data :any;
  private currentUser: any;
  public commandSize: number;
  public commandListe:any;
  public ref :any;
  myBoolean = false;
  constructor(
    public db: AngularFirestore, 
  ) { 
    
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.ref= this.db.collection('commands').doc(this.currentUser.uid).collection('articles');

    this.db.firestore.collection("commands").doc(this.currentUser.uid).collection("articles").where("etat", "==", 'créer')
    .get()
    .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.commands.push(doc.data());
        console.log(this.commands);
        this.commandSize = this.commands.length;
        
  
      });

      
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  ngOnInit() {
  }

  validerReception(id){
    this.myBoolean = true;
    console.log(this.myBoolean);

    this.db.collection("commands").doc(this.currentUser.uid).collection('articles').doc(id).update({
      "etat":"livrer",
      "checked": true,
    }).then(

    );

    
  }


}
