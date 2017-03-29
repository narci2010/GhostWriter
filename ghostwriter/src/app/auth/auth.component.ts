import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';

import { AuthGuard } from '../common/auth.guard';

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
		private aguard: AuthGuard,
		public user: UserService,
		private router: Router) { }


	signup(f: NgForm){
		this.af.signup(f.value).then((authData) => {
			this.user.create(authData.uid, {
				name: authData.auth.email.split('@')[0],
				email: authData.auth.email,
				stats: {
					messages: 0,
					stories: 0
				}
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
						name: authData.auth.email.split('@')[0],
						email: authData.auth.email,
						stats: {
							messages: 0,
							stories: 0
						},
						avatar: authData.google.photoURL
					})
				}
			})
		});
	}

	toggleForm(){
		this.registered = !this.registered
	}

}
