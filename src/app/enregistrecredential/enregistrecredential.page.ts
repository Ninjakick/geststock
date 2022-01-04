import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { UtilisateurService } from '../service/utilisateur.service';

@Component({
  selector: 'app-enregistrecredential',
  templateUrl: './enregistrecredential.page.html',
  styleUrls: ['./enregistrecredential.page.scss'],
})
export class EnregistrecredentialPage implements OnInit {
  credential: FormGroup;
  constructor(
    public loadingController: LoadingController,
      private route: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder,
      public alertController: AlertController,
      public utilisateurservice: UtilisateurService
  ) {
    this.credential = this.formBuilder.group({
          'prenom' : [null, Validators.required],
          'password' : [null, Validators.required],
          'password2' : [null, Validators.required],
      });
  }

  ngOnInit() {
  }
  async enregistrement(){
    const loading = await this.loadingController.create({
        message: 'Veuillez patienter... '
      });
      await loading.present();
      const alert = await this.alertController.create({
        header: 'Erreur!',
        message: 'Les mot de passe ne correspond pas!',
      buttons: ['Ok']
      });
      const alertcompteexistedeja = await this.alertController.create({
        header: 'Erreur!',
        message: 'Le prenom et les mots de passe que vous avez entrée existe déjà!',
        buttons: [
          {
            text: 'Ok',
                handler: () => {
                  this.router.navigate(['home']);
            }
          }
        ]
      });
      var alertsuccess = await this.alertController.create({
        header: 'Enregistrement',
        message: 'Prenom et mot de passe enregistré avec success',
      buttons: [
        {
          text: 'Ok',
              handler: () => {
                  this.router.navigate(['home']);
              }
          }
        ]
      });
      if (this.credential.value.password != this.credential.value.password2) {
        await loading.dismiss();
        await alert.present();
      }
      else{
        await this.utilisateurservice.checkuser(this.credential.value).then(async(res) => {
          if (!res) {
            await this.utilisateurservice.insertUser(this.credential.value).then(async(res) => {
              if (!res) {
                console.log("error")
              }
              else{
                await loading.dismiss();
                await alertsuccess.present();
              }
              console.log(res)
            }, (err) => {
            console.log(err)
          })
          }
          else{
            await loading.dismiss();
            await alertcompteexistedeja.present();
          }
          console.log(res)
        }, (err) => {
        console.log(err)
      })
      }
  }

}
