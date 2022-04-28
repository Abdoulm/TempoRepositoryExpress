import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcheterPage } from './acheter.page';

const routes: Routes = [
  {
    path: '',
    component: AcheterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcheterPageRoutingModule {}
