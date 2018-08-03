import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Account } from './../../models/saida/account.model';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
  }

  async createAccount(account: Account) {
    return await this.afAuth.auth
      .createUserWithEmailAndPassword(account.email, account.password);
  }

  async signinWithEmailAndPassword(account: Account) {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(account.email, account.password);
  }

}
