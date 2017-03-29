import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	public isLoggedIn: boolean;
	public authState

	constructor(
		private router: Router,
		public afService: AuthService,
		public user: UserService,) 
	{
		this.afService.af.auth.subscribe(
			(auth) => {
				if(auth == null) {
					this.authState = null
					console.log("Not Logged in.");
					this.isLoggedIn = false;
					this.router.navigate(['/login'])
				}
				else {
					this.authState = auth
					this.isLoggedIn = true;
					console.log("Successfully logged in.");
					this.user.load(auth.uid).then(() => {
						this.router.navigate(['/home'])
					})
				}
			})
	}

	canActivate() {
		if(this.isLoggedIn) return true;
		this.router.navigate(['/login']);
		return false;
	}
}
