import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-selectionproduit',
  templateUrl: './selectionproduit.page.html',
  styleUrls: ['./selectionproduit.page.scss'],
})
export class SelectionproduitPage implements OnInit {
  list_produit : any;
  list_produitinitial: any;
  constructor(
    public transactionservice: TransactionService, public loadingController: LoadingController,public modalController: ModalController
  ) {
    this.loaddata()
  }
  async loaddata(){
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter... '
    });
    await this.transactionservice.loaddataproduit().then(res => {
        this.list_produit = res
        console.log(res)
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
    });
  }
  ngOnInit() {
  }
  async dismissModal(){
    this.modalController.dismiss({
        'dismissed': true,
        'data_selected': false
      });
  }
  async savedata(data){
    this.modalController.dismiss({
        'dismissed': true,
        'data_selected': true,
        'data': JSON.stringify(data)
      });
  }
  SearchinputChanged(event){
    this.list_produit = this.list_produitinitial;
    this.list_produit = this.list_produit.filter(client=>{
      if (client.Nom.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.Categorie.toLowerCase().indexOf(event.toLowerCase()) != -1) {
        return true
      }
      else{
        return false
      }
    })
  }
}
