import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestSellPageRoutingModule } from './best-sell-routing.module';

import { BestSellPage } from './best-sell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestSellPageRoutingModule
  ],
  declarations: [BestSellPage]
})
export class BestSellPageModule {}
