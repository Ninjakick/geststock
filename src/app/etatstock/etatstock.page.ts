import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { DetailproduitPage } from '../detailproduit/detailproduit.page';
@Component({
  selector: 'app-etatstock',
  templateUrl: './etatstock.page.html',
  styleUrls: ['./etatstock.page.scss'],
})
export class EtatstockPage implements OnInit, AfterViewChecked{
  public donne : any;
  public donneinitial : any;
  public datacontent = false;
  constructor(public loadingController: LoadingController,public alertController: AlertController,public transactionservice: TransactionService,public modalController: ModalController,
      public toastController: ToastController) {
  }
  async loaddata(){
    const loading = await this.loadingController.create({
        message: 'Veuillez patienter... '
      });
      await loading.present();
    await this.transactionservice.loaddataproduit().then(async data=>{
      setTimeout(function(){ this.datacontent = false; }, 1000);

      this.donne = data
      this.donneinitial = this.donne
      loading.dismiss();
    })
  }
  ngOnInit() {

  }
  ngAfterViewChecked(){
    if(!this.datacontent){
      this.datacontent = true;
      this.loaddata()
    }
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
  SearchinputChangedsortie(event){
    this.donne = this.donneinitial;
    this.donne = this.donne.filter(client=>{
      if (client.Type.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.Nom.toLowerCase().indexOf(event.toLowerCase()) != -1 ) {
        return true
      }
      else{
        return false
      }
    })
  }
  async editproduit(data){
    const alert = await this.alertController.create({
      header: 'Entrer la reference',
      inputs: [
        {
          name: 'Prix',
          type: 'number',
          value: data.Prix,
          placeholder: 'Prix'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (alertdata) => {
            const loading = await this.loadingController.create({
              message: 'Veuillez patienter... '
            });
            await loading.present();
            await this.transactionservice.updatestockprix(alertdata.Prix, data.pid ).then(async (res) => {
                loading.dismiss();
                this.presentToastallertesuccess("Le produit a été modifier avec success")
                this.loaddata()
              }, (err) => {
                loading.dismiss();
                this.presentToastallerteerror("Une erreur est survenu lors de modification du produit")
              });
            }
          }]
    });
    await alert.present();
  }
  async supprimeproduit(id){
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter... '
    });
    await loading.present();
    await this.transactionservice.deleteproduit(id).then(async (res) => {
      loading.dismiss();
      this.presentToastallertesuccess("Le produit a été supprimer avec success")
      this.loaddata()
    }, (err) => {
      loading.dismiss();
      this.presentToastallerteerror("Une erreur est survenu lors de suppression du produit")
    });
  }
}
