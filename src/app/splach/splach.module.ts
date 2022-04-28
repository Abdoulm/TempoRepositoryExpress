import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplachPageRoutingModule } from './splach-routing.module';

import { SplachPage } from './splach.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplachPageRoutingModule
  ],
  declarations: [SplachPage]
})
export class SplachPageModule {}
