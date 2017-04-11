import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { StoriesService } from '../providers/stories.service';
import { AuthService } from '../providers/auth.service';

@Component({
	selector: 'app-story-show',
	templateUrl: './story-show.component.html',
	styleUrls: ['./story-show.component.css']
})
export class StoryShowComponent implements OnInit {
	story
	storyText

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
		private router: Router,
		private route: ActivatedRoute,
		private stories: StoriesService) { }

	ngOnInit() {
		this.story = this.stories.getbyId(this.route.snapshot.params['id'])
	}

	goTo(state){
		if(state == "logout")  this.af.logout()
			else this.router.navigate(['/'+ state]);
	}

	isPublic(isPublic){
		return isPublic ? "c-positive" : "c-negative"
	}

	goToStory(id){
		this.router.navigate(['/stories', id]);
	}
}
