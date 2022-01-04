import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatstockPage } from './etatstock.page';

const routes: Routes = [
  {
    path: '',
    component: EtatstockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatstockPageRoutingModule {}
