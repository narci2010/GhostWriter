import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	
	public isLoggedIn: boolean;

	constructor(
		private router: Router,
		public afService: AuthService) 
	{
		this.afService.af.auth.subscribe(
			(auth) => {
				if(auth == null) {
					console.log("Not Logged in.");
					this.isLoggedIn = false;
				}
				else {
					console.log("Successfully Logged in.");
					this.isLoggedIn = true;
				}
			})
	}

	canActivate() {
		if(this.isLoggedIn) return true;
		this.router.navigate(['/login']);
		return false;
	}
}
