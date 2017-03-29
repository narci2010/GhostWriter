import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
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

  constructor(public af: AuthService,
              private router: Router) { }

  goTo(state){
    if(state == "logout")  this.af.logout()
    else this.router.navigate(['/'+ state])
  }

}
