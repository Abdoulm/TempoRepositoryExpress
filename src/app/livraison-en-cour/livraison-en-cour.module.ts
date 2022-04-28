import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivraisonEnCourPageRoutingModule } from './livraison-en-cour-routing.module';

import { LivraisonEnCourPage } from './livraison-en-cour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivraisonEnCourPageRoutingModule
  ],
  declarations: [LivraisonEnCourPage]
})
export class LivraisonEnCourPageModule {}
