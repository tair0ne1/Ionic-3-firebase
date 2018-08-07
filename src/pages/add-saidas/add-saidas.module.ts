import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSaidasPage } from '../add-saidas/add-saidas';

@NgModule({
  declarations: [
    AddSaidasPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSaidasPage),
  ],
})
export class AddSaidasPageModule {}
