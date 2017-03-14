import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './story/story.component';

import { AuthService } from './providers/auth.service';
import { UserService } from './providers/user.service';

import { routes } from './app.routes';

import { AuthGuard } from './common/auth.guard';

import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from './common/firebase.config';

import { InputTextModule, ButtonModule, PasswordModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    StoriesComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AngularFireModule.initializeApp(firebaseConfig),

    RouterModule.forRoot(routes, {
      useHash: true
    }),

    InputTextModule,
    ButtonModule,
    PasswordModule
  ],
  providers: [
    AuthGuard, 

    AuthService, 
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
