import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstockPageRoutingModule } from './addstock-routing.module';

import { AddstockPage } from './addstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstockPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [AddstockPage]
})
export class AddstockPageModule {}
