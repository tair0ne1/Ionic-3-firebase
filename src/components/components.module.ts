import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form';
import { SingupFormComponent } from '../components/singup-form/singup-form';
import { ProfileFormComponent } from './profile-form/profile-form';
@NgModule({
	declarations: [
		LoginFormComponent,
		SingupFormComponent,
    	ProfileFormComponent,
	],
	imports: [IonicModule],
	exports: [
		LoginFormComponent,
		SingupFormComponent,
    	ProfileFormComponent,
	]
})
export class ComponentsModule {}
