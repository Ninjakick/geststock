import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule)
  },
  {
    path: 'enregistrecredential',
    loadChildren: () => import('./enregistrecredential/enregistrecredential.module').then( m => m.EnregistrecredentialPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'etatstock',
    loadChildren: () => import('./etatstock/etatstock.module').then( m => m.EtatstockPageModule)
  },
  {
    path: 'addstock',
    loadChildren: () => import('./addstock/addstock.module').then( m => m.AddstockPageModule)
  },
  {
    path: 'selectionproduit',
    loadChildren: () => import('./selectionproduit/selectionproduit.module').then( m => m.SelectionproduitPageModule)
  },
  {
    path: 'detailproduit',
    loadChildren: () => import('./detailproduit/detailproduit.module').then( m => m.DetailproduitPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
