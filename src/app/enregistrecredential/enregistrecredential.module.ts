import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnregistrecredentialPageRoutingModule } from './enregistrecredential-routing.module';

import { EnregistrecredentialPage } from './enregistrecredential.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EnregistrecredentialPageRoutingModule
  ],
  declarations: [EnregistrecredentialPage]
})
export class EnregistrecredentialPageModule {}
