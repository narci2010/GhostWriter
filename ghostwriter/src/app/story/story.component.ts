import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { StoriesService } from '../providers/stories.service';
import { MessagesService } from '../providers/messages.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
	storyName

  constructor(private router: Router,
  						private route: ActivatedRoute,
  						private stories: StoriesService,
  						public messages: MessagesService) { }

  ngOnInit() {
  	this.messages.load(this.route.snapshot.params['id'])
  }

  send(f: NgForm){
		this.messages.save(f.value)
	}

	getMessages(){
		switch (this.messages.story.rules.visibility) {
			case "letter":
				return this.messages.get(1, "\w", this.messages.story.rules.visibleNumber)

			case "word":
				return this.messages.get(1, " ", this.messages.story.rules.visibleNumber)

			case "sentence":
				return this.messages.get(1, ".", this.messages.story.rules.visibleNumber)

			case "message":
				return this.messages.get(this.messages.story.rules.visibleNumber)
			
			default:
				return this.messages.get()
		}
	}
}
