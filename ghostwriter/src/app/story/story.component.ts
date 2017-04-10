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

	showRules()
	{
		var mask = this.story.messagesDisplayed == 0 ? 
		"You can see all messages " :
		"You can see only " + this.story.messagesDisplayed + " recent messages "
		if(this.story.maskType == "none") mask += " and no mask applyed to them."
			else mask += " and only " + this.story.maskLength + " " + this.story.maskType + (this.story.length % 10 != 1 ? "s" : "") + " are visible to you.";
		return mask;
	}
}
