import { Account } from './../../models/saida/account.model';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController, NavController } from '../../../node_modules/ionic-angular/umd';

@Component({
  selector: 'app-signup-form',
  templateUrl: 'singup-form.html'
})
export class SingupFormComponent {
  account = {} as Account;

  constructor(private auth: AuthProvider,
              private toastCtrl: ToastController,
              private navCtrl: NavController
            ) { }

  register () {
    this.auth.createAccount(this.account)
      .then(() => {
        this.showToast('Usuário cadastrado com sucesso!');
        this.navCtrl.pop();
      })
      .catch((e) => this.handleError(e));
  }

  handleError(error) {
    console.log(error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.showToast('Já existe um usuário com este email.');
        break;
      case 'auth/invalid-email':
        this.showToast('Email inválido.');
        break;
      case 'auth/operation-not-allowed':
        this.showToast('Operação inválida.');
        break;
      case 'auth/weak-password':
        this.showToast('Senha inserida é muito fraca.');
        break;
      default:
        this.showToast('Erro ao cadastrar');
        break;
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      position: 'bottom',
      message: `${message}`,
      duration: 3000
    }).present();
  }
  
}
