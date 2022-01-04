import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailproduitPage } from './detailproduit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailproduitPageRoutingModule {}
