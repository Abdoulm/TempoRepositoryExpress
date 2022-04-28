import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivraisonValidePageRoutingModule } from './livraison-valide-routing.module';

import { LivraisonValidePage } from './livraison-valide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivraisonValidePageRoutingModule
  ],
  declarations: [LivraisonValidePage]
})
export class LivraisonValidePageModule {}
