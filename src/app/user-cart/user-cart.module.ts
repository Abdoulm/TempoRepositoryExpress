import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCartPageRoutingModule } from './user-cart-routing.module';

import { UserCartPage } from './user-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCartPageRoutingModule
  ],
  declarations: [UserCartPage]
})
export class UserCartPageModule {}
