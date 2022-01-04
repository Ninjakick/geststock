import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatstockPageRoutingModule } from './etatstock-routing.module';

import { EtatstockPage } from './etatstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatstockPageRoutingModule
  ],
  declarations: [EtatstockPage]
})
export class EtatstockPageModule {}
