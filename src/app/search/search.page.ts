import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import {Observable, Subject } from 'rxjs';
import {  ViewChild } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('mainSearchbar') searchBar: IonSearchbar;
  foodList$: any;
  sampleArr =[];
  resultArr = [];
  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  searchValue: any;
  results: any;
  constructor(private router: Router,
    private modalController: ModalController,
    private readonly firestore: AngularFirestore) { 
      
    }

  ngOnInit() {
  
  }

  async onInput(event){
    console.log(event.target.value);
    let searchKey: string = event.target.value;
    let firstLetter = searchKey.toUpperCase();

    this.foodList$ = this.firestore.collection("articles");

    if(searchKey.length == 0){
      this.sampleArr = [];
      this.resultArr = [];
    }

    if(this.sampleArr.length == 0){
    
      this.firestore.collection("articles", ref=>ref.where(`index`, '==',firstLetter))
      .snapshotChanges().subscribe(data=>{
        data.forEach(snapchot=>{
          this.sampleArr.push(snapchot.payload.doc.data());
          console.log(snapchot.payload.doc.data());
          
        })
      })
      
    }else{
      this.resultArr = [];
      this.sampleArr.forEach(val=>{
        let name: string=val['nom'];
        if(name.toUpperCase().startsWith(searchKey.toUpperCase())){
          if(true){
            this.resultArr.push(val);
          }
        }
      })
    }
  }


  search(event){
    let self = event.target.value;
    self.results = self.firestore.collection('articles', ref => ref.
    orderBy("nom")
    .startAt(self.searchValue.toLowerCase())
    .endAt(self.searchValue.toLowerCase()+ "\uf8ff")
    .limit(10))
    .valueChanges();

  }
  onCanceled(event){
    console.log(event.target.value);
    
    console.log("canceled");
    this.modalController.dismiss();
    // this.router.navigate(['home']);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }

  redirectToDetail(id){
    this.modalController.dismiss();
    this.router.navigate([`/item-detail/${id}`]);
  }
}
