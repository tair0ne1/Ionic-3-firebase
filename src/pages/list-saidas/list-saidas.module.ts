import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSaidasPage } from '../list-saidas/list-saidas';

@NgModule({
  declarations: [
    ListSaidasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSaidasPage),
  ],
})
export class ListSaidasPageModule {}
