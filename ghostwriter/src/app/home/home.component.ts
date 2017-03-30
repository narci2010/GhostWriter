import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../providers/user.service';
import { StoriesService } from '../providers/stories.service';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	options = [
		{
			class: "fa fa-user-circle",
			name: "Profile",
			state: "home"
		},
		{
			class: "fa fa-book",
			name: "Stories",
			state: "stories"
		},
		{
			class: "fa fa-wrench",
			name: "Settings",
			state: "settings"
		},
		{
			class: "fa fa-sign-out",
			name: "Log Out",
			state: "logout"
		}
	]

  constructor(public af: AuthService,
  						public user: UserService,
  						private router: Router,
  						public stories: StoriesService) { 
  	this.stories.load()
  }

  goTo(state){
  	if(state == "logout")	this.af.logout()
  	else this.router.navigate(['/'+ state])
  }

	goToStory(id){
		this.router.navigate(['/stories', id]);
	}
}
