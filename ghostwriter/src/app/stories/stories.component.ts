import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StoriesService } from '../providers/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  constructor(private router: Router,
  						public stories: StoriesService) { }

  ngOnInit() {
  }

  goTo(story){
  	this.router.navigate(['/stories', story.name]);
  }

}
