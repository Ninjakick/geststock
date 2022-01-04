import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit, AfterViewChecked {
  public donneentree : any;
  public donneentreeinitial : any;
  public donnesortie : any;
  public donnesortieinitial : any;
  active = "Entrée";
  public datacontent = false;
  constructor(public loadingController: LoadingController,public transactionservice: TransactionService) {
  }

  ngOnInit() {

  }
  ngAfterViewChecked(){
    if(!this.datacontent){
      this.datacontent = true;
      this.loaddata()
    }
  }
  async loaddata(){
    const loading = await this.loadingController.create({
        message: 'Veuillez patienter... '
      });
      await loading.present();
    await this.transactionservice.loaddatahistorique().then(async data=>{
      console.log(data)
      this.donneentree = data.filter(entre=>{
        if(entre.Type == "Entrée"){
          return true
        }
        return false
      })
      this.donnesortie = data.filter(entre=>{
        if(entre.Type == "Sortie"){
          return true
        }
        return false
      })
      this.donneentreeinitial = this.donneentree
      this.donnesortieinitial = this.donnesortie
      setTimeout(function(){ this.datacontent = false; }, 1000);
      loading.dismiss();
    })
  }
  segmentChanged(event){
    this.active =  event.detail.value;
  }
  SearchinputChangedentree(event){
    this.donneentree = this.donneentreeinitial;
    this.donneentree = this.donneentree.filter(client=>{
      if (client.Type.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.Nom.toLowerCase().indexOf(event.toLowerCase()) != -1 ) {
        return true
      }
      else{
        return false
      }
    })
  }
  SearchinputChangedsortie(event){
    this.donnesortie = this.donnesortieinitial;
    this.donnesortie = this.donnesortie.filter(client=>{
      if (client.Type.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.Nom.toLowerCase().indexOf(event.toLowerCase()) != -1 ) {
        return true
      }
      else{
        return false
      }
    })
  }
}
