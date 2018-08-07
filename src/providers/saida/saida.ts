import { Saida } from '../../models/saida/saida.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class SaidaProvider {
  private PATH = 'saidas/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list<Saida>(`${this.PATH}`, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(changes => 
           changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  
  get(key: string) {
    return this.db.object(`${this.PATH}${key}`)
      .snapshotChanges()
      .pipe(
         map(changes =>{
          return { key: changes.key, ...changes.payload.val() }
          })
        );
  }

  save(saida: Saida) {
    return new Promise((resolve, reject) => {
      if (saida.key) {
        this.db.list(this.PATH)
          .update(saida.key, 
            { 
              name: saida.name,
              local: saida.local,
              valor: saida.valor
            })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push(
            { 
              name: saida.name,
              local: saida.local,
              valor: saida.valor
            })
          .then(() => resolve());
      }
    });
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
