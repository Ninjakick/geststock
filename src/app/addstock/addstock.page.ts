import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { LoadingController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { SelectionproduitPage } from '../selectionproduit/selectionproduit.page';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.page.html',
  styleUrls: ['./addstock.page.scss'],
})
export class AddstockPage implements OnInit {
  active = "Nouveau";
  nouveauform: FormGroup;
  entrestock: FormGroup;
  sortiestock: FormGroup;
  produitselected: any;
  constructor(public loadingController: LoadingController,
      private formBuilder: FormBuilder,
      public alertController: AlertController,
      public toastController: ToastController,
      public transactionservice: TransactionService,public modalController: ModalController
  ) {
    this.nouveauform = this.formBuilder.group({
        'Nom' : [null, Validators.required],
        'Categorie' : [null, Validators.required],
        'Prix' : [null, Validators.required],
        'Qte' : [null, Validators.required]
    });
    this.entrestock = this.formBuilder.group({
        'Produit' : [null, Validators.required],
        'Qte' : [null, Validators.required],
        'prodid' : [null],
        'Type' : ["Entrée"],
        'Qteactuel': [null]
    });
    this.sortiestock = this.formBuilder.group({
        'Produit' : [null, Validators.required],
        'Qte' : [null, Validators.required],
        'prodid' : [null],
        'Type' : ["Sortie"],
        'Qteactuel': [null]
    });
  }

  ngOnInit() {
  }
  async presentToastallertesuccess(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: "success"
    });
    await toast.present();
  }
  async presentToastallerteerror(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: "warning"
    });
    await toast.present();
  }
  segmentChanged(event){
    this.active =  event.detail.value;
  }
  async enregistrenewstock(){
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter... '
    });
    await loading.present();
    const alert = await this.alertController.create({
      header: 'Entrer l\'url du serveur',
      message: 'Ce produit existe déjà dans la base, Voulez vous ajouter la quantité?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: async (alertdata) => {
          await this.entrezproduit()
        }
      }
      ]
    });
    await this.transactionservice.produitinfobyname(this.nouveauform.value.Nom).then(async (res) => {
      if(res.length>0){
        this.produitselected = res[0]
        this.entrestock.controls['Produit'].setValue(this.produitselected.Nom);
        this.entrestock.controls['prodid'].setValue(this.produitselected.pid);
        this.entrestock.controls['Qteactuel'].setValue(this.produitselected.Qte);
        loading.dismiss();
        alert.present()
      }
      else{
        await this.transactionservice.enregistrenvstock(this.nouveauform.value).then(async (res) => {
            await this.transactionservice.produitinfobyname(this.nouveauform.value.Nom).then(async (res) => {
              console.log(res)
              if(res.length>0){
                var obj = {
                  "Qte": this.nouveauform.value.Qte,
                  "prodid": res[0].pid,
                  "Type": "Entrée"
                }
                await this.transactionservice.entrezhistorique(obj).then(async (res)=>{
                    loading.dismiss();
                    this.presentToastallertesuccess("Nouveau produit enregistrer avec success")
                  }, (err) => {
                     loading.dismiss();
                  this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
                })
              }

            }, (err) => {
               loading.dismiss();
              this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
            })
          }, (err) => {
            this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
            loading.dismiss();
        });
      }
    }, (err) => {
      this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
    })
  }
  async entrezproduit(){
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter... '
    });
    await loading.present();
    await this.transactionservice.entrezhistorique(this.entrestock.value).then(async (res)=>{
      var nombre = this.entrestock.value.Qteactuel+this.produitselected.Qte
      await this.transactionservice.updatestockdispo(nombre, this.entrestock.value.prodid).then(async (res)=>{
        this.presentToastallertesuccess("Entrée produit enregistrer avec success")
        loading.dismiss();
      }, (err) => {
        this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
        loading.dismiss();
      })
    }, (err) => {
      this.presentToastallerteerror("Une erreur s'est produite lors de l'insertion du produit")
      loading.dismiss();
    })
  }
  async selecttypeentre(){
    var modal = await this.modalController.create({
      component: SelectionproduitPage
    });
    await modal.present();
    var { data } = await modal.onWillDismiss();
    if (data.dismissed) {
      if (data.data_selected) {
        this.produitselected = JSON.parse(data.data)
        this.entrestock.controls['Produit'].setValue(this.produitselected.Nom);
        this.entrestock.controls['prodid'].setValue(this.produitselected.pid);
        this.entrestock.controls['Qteactuel'].setValue(this.produitselected.Qte);
      }
      else{
        this.produitselected = {}
      }
    }
  }
  async selecttypesortie(){
    var modal = await this.modalController.create({
      component: SelectionproduitPage
    });
    await modal.present();
    var { data } = await modal.onWillDismiss();
    if (data.dismissed) {
      if (data.data_selected) {
        this.produitselected = JSON.parse(data.data)
        this.sortiestock.controls['Produit'].setValue(this.produitselected.Nom);
        this.sortiestock.controls['prodid'].setValue(this.produitselected.pid);
        this.sortiestock.controls['Qteactuel'].setValue(this.produitselected.Qte);
      }
      else{
        this.produitselected = {}
      }
    }
  }
  async updatestock(data){
    if(data == "entre"){
      this.entrezproduit()
    }
    else{
      var nombre = this.produitselected.Qte-this.sortiestock.value.Qteactuel
      if(nombre<0){
        this.presentToastallerteerror("Il ne reste que "+this.produitselected.Qte+" dans le stock")
        return false
      }
      const loading = await this.loadingController.create({
        message: 'Veuillez patienter... '
      });
      await loading.present();
      await this.transactionservice.entrezhistorique(this.sortiestock.value).then(async (res)=>{
        var nombre = this.produitselected.Qte-this.sortiestock.value.Qteactuel
        await this.transactionservice.updatestockdispo(nombre, this.sortiestock.value.prodid).then(async (res)=>{
          this.presentToastallertesuccess("Sortie produit enregistrer avec success")
          loading.dismiss();
        }, (err) => {
          this.presentToastallerteerror("Une erreur s'est produite lors de modification du produit")
          loading.dismiss();
        })
      }, (err) => {
        this.presentToastallerteerror("Une erreur s'est produite lors de modification du produit")
        loading.dismiss();
      })
    }
  }
}
