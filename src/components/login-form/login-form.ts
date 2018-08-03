import { NavController, ToastController } from 'ionic-angular';
import { Account } from './../../models/saida/account.model';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  account = {} as Account;

  constructor(private navCtrl: NavController, 
              private auth: AuthProvider,
              private toastCtrl: ToastController,
            ) {
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this.auth.signinWithEmailAndPassword(this.account)
      .then(() => {
        this.showToast('Logado com sucesso!')
        this.navCtrl.setRoot('HomePage')
      })
      .catch((e) => this.handleError(e));
  }

  handleError(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.showToast('Email inválido.');
        break;
      case 'auth/user-disabled':
        this.showToast('Usuário desabilitado.');
        break;
      case 'auth/user-not-found':
        this.showToast('Usuário não encontrado.');
        break;
      case 'auth/wrong-password':
        this.showToast('Usuário ou senha inválidos.');
        break;
      default:
        this.showToast('Erro ao fazer login');
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
