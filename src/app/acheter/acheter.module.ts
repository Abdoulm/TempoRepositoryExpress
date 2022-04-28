import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcheterPageRoutingModule } from './acheter-routing.module';

import { AcheterPage } from './acheter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcheterPageRoutingModule
  ],
  declarations: [AcheterPage]
})
export class AcheterPageModule {}
