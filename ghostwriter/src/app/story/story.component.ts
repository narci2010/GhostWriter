import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
	storyName

  constructor(private router: Router,
  						private route: ActivatedRoute) { }

  ngOnInit() {
  	this.storyName = this.route.snapshot.params['id']
  }

}
