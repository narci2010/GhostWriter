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

}
