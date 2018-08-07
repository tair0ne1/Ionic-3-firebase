import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from 'firebase/app';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { Subscription } from '../../../node_modules/rxjs';
import { ToastController, Toast, LoadingController, Loading } from '../../../node_modules/ionic-angular';

@Component({
  selector: 'app-profile-form',
  templateUrl: 'profile-form.html'
})
export class ProfileFormComponent implements OnDestroy {
  private toast: Toast;
  private loading: Loading;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private auth: AuthProvider,
              private profileProvider: ProfileProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController
  ) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  async saveProfile() {
    this.setUp('Salvando perfil, aguarde...');
    this.loading.present();
    if (this.authenticatedUser) {
      await this.profileProvider.saveProfile(this.authenticatedUser, this.profile)
        .then(() => {
          this.toast.setMessage('Perfil salvo com sucesso!').present();
          this.saveProfileResult.emit(true);
        })
        .catch((e) => {
          this.toast.setMessage('Erro ao salvar perfil!').present();
        });
    }
    this.loading.dismiss();
  }

  async signout() {
    this.setUp('Saindo... Volte logo ;)');
    this.auth
      .signout()
      .then(() => {
        //TODO: redirecionar para página de login
      })
      .catch((e) => {
        this.toast.setMessage('Erro ao sair!').present();
      })
  }

  private setUp(message: string) {
    this.toast = this.toastCtrl.create({
      position: 'bottom',
      duration: 3000
    });
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}