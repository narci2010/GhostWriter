import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './story/story.component';

import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '',       component: AuthComponent },
  
  { path: 'login',  component: AuthComponent },
  { path: 'signup', component: AuthComponent },

  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'stories',   component: StoriesComponent, canActivate: [AuthGuard] },
  { path: 'stories/:id', component: StoryComponent, canActivate: [AuthGuard] },

  { path: '*', component: AuthComponent }
];