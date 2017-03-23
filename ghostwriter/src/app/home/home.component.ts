import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../providers/user.service';
import { StoriesService } from '../providers/stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	displayDialog: boolean

  constructor(public user: UserService,
  						public stories: StoriesService) { 
  	this.stories.load()
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
