import { Component } from '@angular/core';

import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UtilisateurService } from '../service/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  credential: FormGroup;
  constructor(
    public loadingController: LoadingController,
      private route: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder,
      public alertController: AlertController,
      private nativeStorage: NativeStorage,
      public utilisateurservice: UtilisateurService
  ) {
    this.credential = this.formBuilder.group({
          'prenom' : [null, Validators.required],
          'password' : [null, Validators.required],
          'remember' : [null],
      });
  }
  async authentification(){
    const loading = await this.loadingController.create({
        message: 'Veuillez patienter... '
      });
      await loading.present();
      const alert = await this.alertController.create({
        header: 'Erreur!',
        message: 'Prenom ou mot de passe incorrecte!',
      buttons: ['Ok']
      });
      await this.utilisateurservice.checkuser(this.credential.value).then(async(res) => {
        if (!res) {
          await loading.dismiss();
          await alert.present();
        }
        else{
          await loading.dismiss();
          this.nativeStorage.setItem('prenom', this.credential.value.prenom)
        .then(() => {
          console.log('Enregistrement nom utilisateur effectuer avec success')
        },
          error => console.error('Erreur lors de l\'enregistrement', error)
        );
          if (this.credential.value.remember) {
            this.nativeStorage.setItem('remember', "Yes")
          .then(() => {
            this.router.navigate(['acceuil'])
          },
            error => console.error('Erreur lors de l\'enregistrement', error)
          );
          }
          else{
            this.nativeStorage.setItem('remember', "No")
          .then(() => {
            this.router.navigate(['acceuil'])
          },
            error => console.error('Erreur lors de l\'enregistrement', error)
          );
          }
        }
      }, (err) => {
      console.log(err)
    })
  }
}
