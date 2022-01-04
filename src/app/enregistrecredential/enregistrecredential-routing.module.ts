import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnregistrecredentialPage } from './enregistrecredential.page';

const routes: Routes = [
  {
    path: '',
    component: EnregistrecredentialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnregistrecredentialPageRoutingModule {}
