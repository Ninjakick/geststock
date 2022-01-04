import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionproduitPage } from './selectionproduit.page';

const routes: Routes = [
  {
    path: '',
    component: SelectionproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionproduitPageRoutingModule {}
