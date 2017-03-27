import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent {
	registered = false;
	error;
	submitted = false;

	constructor(public af: AuthService,
		public user: UserService,
		private router: Router) { }


	signup(f: NgForm){
		this.af.signup(f.value).then((authData) => {
			this.user.create(authData.uid, {
				email: authData.auth.email
			});
		}).catch((error) => {
			this.error = error
			console.log(error)
		});
	}

	login(f: NgForm) {
		this.submitted = true;
		this.error = null

		if (f.valid) {
			this.af.login(f.value).catch((error:any) => {
				this.error = error
				console.log(error)
			});
		}
	}

	loginGoogle(){
		this.af.loginGoogle().then((authData) => {
			this.user.exists(authData.uid).then(exist => {
				if(!exist){
					this.user.create(authData.uid, {
						email: authData.auth.email
					})
				}
			})
		});
	}

	toggleForm(){
		this.registered = !this.registered
	}

}
