import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Account } from '../../models/saida/account.model';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
  }

  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  async createAccount(account: Account) {
    return await this.afAuth.auth
      .createUserWithEmailAndPassword(account.email, account.password);
  }

  async signinWithEmailAndPassword(account: Account) {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(account.email, account.password);
  }

  async signout () {
    return await this.afAuth.auth
      .signOut();
  }

}
