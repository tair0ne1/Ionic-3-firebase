import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listSaidasRoot = 'ListSaidasPage'
  addSaidasRoot = 'AddSaidasPage'
  profileRoot = 'ProfilePage'

  constructor(public navCtrl: NavController) {}

}
