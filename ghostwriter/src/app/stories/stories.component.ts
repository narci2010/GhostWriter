import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../providers/user.service';
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
    {label: "Story", value: "story"},
    {label: "Poem", value: "poem"}
  ]

  maskTypes = [
    {label: "none", value: "none"},
    {label: "letters", value: "letter"},
    {label: "words", value: "word"},
    {label: "sentences", value: "sentence"},
  ]

  rules = {}

  constructor(private af: AuthService,
              private router: Router,
              public user: UserService,
  						public stories: StoriesService) { }

  ngOnInit() {
  }

  goToStory(id){
  	this.router.navigate(['/stories', id]);
  }

  show(id){
    this.router.navigate(['/stories', id, 'show']);
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

  star(id)
  {
    this.stories.star(id)
  }

  unstar(id)
  {
    this.stories.unstar(id)
  }

  permissionIconClass(permission){
    switch (permission) {
      case "creator":
        return "fa fa-diamond"
      case "admin":
        return "fa fa-key"
      case "writer":
        return "fa fa-pencil"   
      default:
        return "fa fa-eye"
    }
  }

  typeIconClass(type){
    return type == "story" ? "fa fa-book" : "fa fa-newspaper-o"
  }

  isPublic(isPublic){
    return isPublic ? "green" : "red"
  }

}
