import { Component } from '@angular/core';
import { UserService } from '../providers/user.service';
import { StoriesService } from '../providers/stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public user: UserService,
  						public stories: StoriesService) { 
  	this.stories.load()
  }

}
