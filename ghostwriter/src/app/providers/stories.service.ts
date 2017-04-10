import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { MessagesService } from "./messages.service";
import { AngularFire} from 'angularfire2';

@Injectable()
export class StoriesService {
  private stories = []
  storiesRef = {}

  constructor(
    public af: AngularFire,
    public user: UserService,
    public messages: MessagesService) {
  }


  load(){
    this.stories = []
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
        type: snapshot.type,
        maskType: snapshot.maskType,
        maskLength: snapshot.maskLength,
        messagesDisplayed: snapshot.messagesDisplayed,
        public: snapshot.public,

        usersCount: snapshot.users != null ? Object.keys(snapshot.users).length : 0,
        messagesCount: snapshot.messages != null ? Object.keys(snapshot.messages).length : 0,
        stared: snapshot.stared != null && snapshot.stared[this.user.getID()] ? true : false,
        permission: snapshot.users != null && snapshot.users[this.user.getID()] != null ? snapshot.users[this.user.getID()] : "reader"
      }

      if(index == -1) this.stories.push(data)
        else this.stories[index] = data;
    })
  }

  get(count?: number){
    if(count) return this.stories.slice(0, count);
    else return this.stories;
  }

  getbyId(id){
    return this.stories.find(function(story){return story.id === id});
  }

  show(id){
    console.log("Hey")
    var s = this.stories.find(function(story){return story.id === id});
    this.messages.load(s)
    return this.messages.get().map(x => x.text).join("\n")
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

  star(storyId){
    this.user.star(storyId)
    this.af.database.object('/stories/' + storyId + "/stared/" + this.user.getID()).set(true)
  }

  unstar(storyId)
  {
    this.user.unstar(storyId)
    this.af.database.list('/stories/' + storyId + '/stared').remove(this.user.getID())
  }

}