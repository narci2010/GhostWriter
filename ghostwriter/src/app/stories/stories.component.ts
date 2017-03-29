import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { StoriesService } from '../providers/stories.service';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  displayDialog: boolean

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

  storyTypes = [
    {label: "Story", value: "Story"},
    {label: "Poem", value: "Poem"}
  ]

  maskTypes = [
    {label: "none", value: "none"},
    {label: "letters", value: "letter"},
    {label: "words", value: "word"},
    {label: "sentences", value: "sentence"},
  ]

  rules = {}

  constructor(public af: AuthService,
              private router: Router,
  						public stories: StoriesService) { }

  ngOnInit() {
  }

  goToStory(id){
  	this.router.navigate(['/stories', id]);
  }

  goTo(state){
    if(state == "logout")  this.af.logout()
    else this.router.navigate(['/'+ state])
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
