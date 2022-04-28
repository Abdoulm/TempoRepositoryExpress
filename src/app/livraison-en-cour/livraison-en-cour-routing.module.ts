import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivraisonEnCourPage } from './livraison-en-cour.page';

const routes: Routes = [
  {
    path: '',
    component: LivraisonEnCourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivraisonEnCourPageRoutingModule {}
