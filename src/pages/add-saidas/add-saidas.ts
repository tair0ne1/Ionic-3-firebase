import { SaidaProvider } from './../../providers/saida/saida';
import { Saida } from './../../models/saida/saida.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-saidas',
  templateUrl: 'add-saidas.html',
})
export class AddSaidasPage {
  title: string;
  form: FormGroup;
  saida: Saida;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private provider: SaidaProvider
            ) {
    //Inicializa os dados do objeto saida com os dados que viaram por parâmtro, ou vazio caso não venham nenhum
    //Maneira 1
    this.saida = this.navParams.data.saida || {};
    //Inicializa o formulário
    this.createForm();

    //Maneira 2
//    if(this.navParams.data.key) {
//      const subscribe = this.provider.get(this.navParams.data.key).subscribe((s: any) => {
//        subscribe.unsubscribe();

//        this.saida = s;
//        this.createForm();
//      })
//    } else {
//      this.saida = null;
//      this.createForm();
//    }
    //Muda o título da página se for uma nova saída ou alterar uma antiga
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.saida ? 'Alterando Saída' : 'Nova saída';
  }

  private createForm() {
    this.form = this.formBuilder.group({
      key: [this.saida.key],
      name: [this.saida.name, Validators.required],
      local: [this.saida.local, Validators.required],
      valor: [this.saida.valor, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Saída salva com sucesso.', duration: 3000}).present();
          this.navCtrl.setRoot('ListSaidasPage');
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao salvar a saída.', duration: 3000}).present();
          console.error(e);
        }
      )
    }
  }

  get name() {
    return this.form.get('name');
  }

  get local() {
    return this.form.get('local');
  }

  get valor() {
    return this.form.get('valor');
  }
}
