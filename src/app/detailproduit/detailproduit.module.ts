import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailproduitPageRoutingModule } from './detailproduit-routing.module';

import { DetailproduitPage } from './detailproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailproduitPageRoutingModule
  ],
  declarations: [DetailproduitPage]
})
export class DetailproduitPageModule {}
