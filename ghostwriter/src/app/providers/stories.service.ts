import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { AngularFire} from 'angularfire2';

@Injectable()
export class StoriesService {
  private stories = []
  storiesRef = {}

  constructor(
    public af: AngularFire,
    public user: UserService) {
  }

  load(){
    for(var sid in this.user.get().stories) 
      this.subscribe(sid)
  }

  subscribe(sid){
    this.storiesRef[sid] = this.af.database.object('/stories/' + sid).subscribe(snapshot => {
      var index = this.stories.findIndex(s => s.id == snapshot.$key)
      var data = {
        id: snapshot.$key,
        name: snapshot.name,
        desc: snapshot.desc,
        messageCount: snapshot.messages != null ? Object.keys(snapshot.messages).length : 0,
        rules: snapshot.rules
      }
      if(index == -1) this.stories.push(data)
        else this.stories[index] = data;
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
      this.af.database.object('/users/' + this.user.getID() + "/stories/" + sid).set("writer")
      this.subscribe(sid)
    }
  }

  delete(id){
    this.stories = this.stories.filter(s => s.id != id)

    this.storiesRef[id].unsubscribe()
    delete this.storiesRef[id]

    this.af.database.list('/stories').remove(id);
    this.af.database.list('/users/' + this.user.getID() + '/stories').remove(id);
  }
}