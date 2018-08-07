import { Profile } from './../../models/profile/profile.model';
import { User } from 'firebase/app';
import { ProfileProvider } from './../../providers/profile/profile';
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
              private profile: ProfileProvider
            ) {
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this.auth.signinWithEmailAndPassword(this.account)
      .then((res) => {
        this.showToast('Logado com sucesso!')
        this.profile.getProfile(res.user).then((prof) => {
          prof.subscribe((profile: Profile) => {
            profile ? this.navCtrl.setRoot('HomePage') : this.navCtrl.setRoot('ProfilePage');
          })
        })
        .catch((e) => this.handleError(e));
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
