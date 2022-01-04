import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectionproduitPageRoutingModule } from './selectionproduit-routing.module';

import { SelectionproduitPage } from './selectionproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectionproduitPageRoutingModule
  ],
  declarations: [SelectionproduitPage]
})
export class SelectionproduitPageModule {}
