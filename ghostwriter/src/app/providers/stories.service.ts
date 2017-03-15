import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { AngularFire} from 'angularfire2';

@Injectable()
export class StoriesService {
  stories = []

  constructor(
    public af: AngularFire,
    public user: UserService) {
  }

  load(){
    return new Promise((resolve, reject) => {
      var i = 0, storyCount = Object.keys(this.user.user.stories).length
      for(var sid in this.user.user.stories){
        this.af.database.object('/stories/' + sid).subscribe(snapshot => {
          this.stories.push({
            id: snapshot.$key,
            messages: snapshot.messages
          })
          if (++i == storyCount) resolve()
        })
      }
    })
  }

  getbyId(id){
    return this.stories.find(function(story){return story.id === id});
  }

  get(count?){
    if(count) return this.stories.slice(0, count);
    else return this.stories;
  }

  save(data, id?){
    let sRef = this.af.database.list('/stories');

    if(id) sRef.update(id, data);
    else {
      var sid = sRef.push(data).key;
      this.af.database.list('/user/' + this.user.getID() + "/stories").update(sid, "writer")
    }
  }

  delete(id){
    this.af.database.list('/stories').remove(id);
    this.af.database.list('/users/' + this.user.getID() + '/stories').remove(id);
  }
}