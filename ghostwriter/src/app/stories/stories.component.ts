import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { StoriesService } from '../providers/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  displayDialog: boolean

  constructor(private router: Router,
  						public stories: StoriesService) { }

  ngOnInit() {
  }

  goTo(storyId){
  	this.router.navigate(['/stories', storyId]);
  }

  delete(id){
    this.stories.delete(id)
  }

  showDialog(){
    this.displayDialog = true
  }

  saveStory(f: NgForm){
    this.stories.save(f.value)
    this.displayDialog = false
  }

}
