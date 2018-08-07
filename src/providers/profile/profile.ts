import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.model';
import 'rxjs/add/operator/take'

@Injectable()
export class ProfileProvider {
  private PATH = '/profiles/';

  constructor(private db: AngularFireDatabase) {
  }

  async getProfile(user: User) {
    return await this.db.object<Profile>(`${this.PATH}${user.uid}`).valueChanges().take(1);
  }

  async saveProfile(user: User, profile: Profile) {
    let profileObject = this.db.object(`${this.PATH}${user.uid}`);

    return await profileObject.set(profile);
  }


}
