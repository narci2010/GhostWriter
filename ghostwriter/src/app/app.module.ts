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
import { StoryShowComponent } from './story-show/story-show.component';

import { AuthService } from './providers/auth.service';
import { UserService } from './providers/user.service';
import { StoriesService } from './providers/stories.service';
import { MessagesService } from './providers/messages.service';

import { routes } from './app.routes';

import { AuthGuard } from './common/auth.guard';

import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from './common/firebase.config';

import { InputTextModule,
        InputTextareaModule, 
        ButtonModule, 
        PasswordModule, 
        DataListModule, 
        DataGridModule,
        DialogModule, 
        SpinnerModule,
        DropdownModule } from 'primeng/primeng';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    StoriesComponent,
    StoryComponent,
    SettingsComponent,
    StoryShowComponent
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
    InputTextareaModule,
    ButtonModule,
    PasswordModule,
    DataListModule,
    DataGridModule,
    DialogModule,
    SpinnerModule,
    DropdownModule
  ],
  providers: [
    AuthGuard, 

    AuthService, 
    UserService,
    StoriesService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
