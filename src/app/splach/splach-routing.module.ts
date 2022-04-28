import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplachPage } from './splach.page';

const routes: Routes = [
  {
    path: '',
    component: SplachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplachPageRoutingModule {}
