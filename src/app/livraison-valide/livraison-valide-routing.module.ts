import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivraisonValidePage } from './livraison-valide.page';

const routes: Routes = [
  {
    path: '',
    component: LivraisonValidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivraisonValidePageRoutingModule {}
