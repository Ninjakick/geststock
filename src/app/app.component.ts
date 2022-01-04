import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router  } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UtilisateurService } from './service/utilisateur.service';
import { TransactionService } from './service/transaction.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    public router: Router,
    public utilisateurservice: UtilisateurService,
    public transactionservice: TransactionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checketatapplication()
    });
  }
  checketatapplication(){
    this.nativeStorage.getItem('remember')
    .then(
      (data) => {
        console.log(data)
        if (data) {
          if (data == "Yes") {
            this.router.navigate(['acceuil']);
          }
          else{
            this.router.navigate(['home']);
          }
        }
        else{
          this.router.navigate(['enregistrecredential']);
        }
      }).catch(e => {
        this.router.navigate(['enregistrecredential']);
        console.error(e)
    });
  }
}
