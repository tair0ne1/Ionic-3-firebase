import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { SingupFormComponent } from './singup-form/singup-form';
@NgModule({
	declarations: [
		LoginFormComponent,
		SingupFormComponent,
	],
	imports: [IonicModule],
	exports: [
		LoginFormComponent,
		SingupFormComponent,
	]
})
export class ComponentsModule {}
