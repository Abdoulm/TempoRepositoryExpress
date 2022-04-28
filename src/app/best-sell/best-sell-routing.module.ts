import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestSellPage } from './best-sell.page';

const routes: Routes = [
  {
    path: '',
    component: BestSellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestSellPageRoutingModule {}
