import { Saida } from './../../models/saida/saida.model';
import { SaidaProvider } from './../../providers/saida/saida';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Observable } from '../../../node_modules/rxjs';

@IonicPage()
@Component({
  selector: 'page-list-saidas',
  templateUrl: 'list-saidas.html',
})
export class ListSaidasPage {
  saidas: Observable<any>;

  constructor(public navCtrl: NavController, 
              private provider: SaidaProvider,
              private toastCtrl: ToastController
            ) {
      this.saidas = this.provider.getAll();
      /*this.saidas.subscribe(val => val.forEach(element => {
        console.log("saida: " + element.name + " key: " + element.key);
      })); */
  }

  newSaida() {
    this.navCtrl.push('AddSaidasPage');
  }

  editSaida(saida: Saida) {
    //Maneira 1
    this.navCtrl.push('AddSaidasPage', { saida: saida });

    //Maneira 2
    //this.navCtrl.push('AddSaidasPage', { key: saida.key});
  }

  removeSaida(key: string) {
    if(key) {
      this.provider.remove(key)
        .then(() => {
          this.toastCtrl.create({ message: 'Saida removida com sucesso.', duration: 3000}).present();
        })
        .catch(() => {
          this.toastCtrl.create({ message: 'Erro ao remover a saida.', duration: 3000}).present();
        })
    }
  }

}
