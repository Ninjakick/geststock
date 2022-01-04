import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SelectionproduitPageModule } from './selectionproduit/selectionproduit.module';DetailproduitPageModule
import { DetailproduitPageModule } from './detailproduit/detailproduit.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SelectionproduitPageModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen,
    NativeStorage,
    SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
