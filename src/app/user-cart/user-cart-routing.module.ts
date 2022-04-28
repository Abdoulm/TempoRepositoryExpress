import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCartPage } from './user-cart.page';

const routes: Routes = [
  {
    path: '',
    component: UserCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCartPageRoutingModule {}
