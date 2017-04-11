import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params} from "@angular/router";

import { StoriesService } from '../providers/stories.service';
import { MessagesService } from '../providers/messages.service';
import { AuthService } from '../providers/auth.service';

@Component({
	selector: 'app-story',
	templateUrl: './story.component.html',
	styleUrls: ['./story.component.css']
})
export class StoryComponent {
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
	
	storyName
	story

	constructor(public af: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private stories: StoriesService,
		public messages: MessagesService) { }

	ngOnInit() {
		this.story = this.stories.getbyId(this.route.snapshot.params['id'])
		this.messages.load(this.story)
	}

	send(f: NgForm){
		this.messages.save(f.value)
	}

	goTo(state){
		if(state == "logout")  this.af.logout()
			else this.router.navigate(['/'+ state]);
	}

	show(id){
		this.router.navigate(['/stories', id, 'show']);
	}

	typeIconClass(type){
		return type == "story" ? "fa fa-book" : "fa fa-newspaper-o"
	}

	isPublic(isPublic){
		return isPublic ? "c-positive" : "c-negative"
	}
}
