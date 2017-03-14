import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './story/story.component';

export const routes: Routes = [
  { path: '',       component: AuthComponent },
  { path: 'login',  component: AuthComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'stories',   component: StoriesComponent },
  { path: 'story',   component: StoryComponent },
  { path: '**',     component: AuthComponent }
];