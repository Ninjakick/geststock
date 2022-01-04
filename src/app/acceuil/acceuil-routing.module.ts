import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceuilPage } from './acceuil.page';

/*const routes: Routes = [
  {
    path: '',
    component: AcceuilPage
  }
];*/
const routes: Routes = [
  {
  path: 'acceuil',
  component: AcceuilPage,
  children:
    [
      {
        path: 'Nouveau',
        children:
          [
            {
              path: '',
              loadChildren: () => import('../addstock/addstock.module').then( m => m.AddstockPageModule)
            }
          ]
      },
      {
        path: 'Historique',
        children:
          [
            {
              path: '',
              loadChildren: () => import('../historique/historique.module').then( m => m.HistoriquePageModule)
            }
          ]
      },
      {
        path: 'Etat_Stock',
        children:
          [
            {
              path: '',
              loadChildren: () => import('../etatstock/etatstock.module').then( m => m.EtatstockPageModule)
            }
          ]
      },
      {
        path: '',
        redirectTo: 'acceuil/Nouveau',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'acceuil/Nouveau',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceuilPageRoutingModule {}
