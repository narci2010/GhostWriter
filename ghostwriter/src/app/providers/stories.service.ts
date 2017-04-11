import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { AngularFire } from 'angularfire2';

@Injectable()
export class StoriesService {
  private stories = []
  storiesRef = {}

  constructor(
    public af: AngularFire,
    public user: UserService) {
  }


  load(){
    this.stories = []
    for(var sid in this.user.stories) 
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
        messageVisibility: snapshot.messsageVisibility,
        public: snapshot.public,

        usersCount: snapshot.users != null ? Object.keys(snapshot.users).length : 0,
        messagesCount: snapshot.messages != null ? Object.keys(snapshot.messages).length : 0,
        stared: snapshot.stared != null && snapshot.stared[this.user.id] ? true : false,
        permission: snapshot.users != null && snapshot.users[this.user.id] != null ? snapshot.users[this.user.id] : "reader"
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

  save(data, id?){
    let sRef = this.af.database.list('/stories');

    if(id) sRef.update(id, data);
    else {
      data.users = {}
      data.users[this.user.id] = "creator"
      var sid = sRef.push(data).key;
      this.af.database.object('/users/' + this.user.id + "/stories/" + sid).set("creator")
      this.subscribe(sid)
    }
  }

  delete(id){
    this.stories = this.stories.filter(s => s.id != id)

    this.storiesRef[id].unsubscribe()
    delete this.storiesRef[id]

    this.af.database.list('/stories').remove(id);
    this.af.database.list('/users/' + this.user.id + '/stories').remove(id);
  }

  star(storyId){
    this.user.star(storyId)
    this.af.database.object('/stories/' + storyId + "/stared/" + this.user.id).set(true)
  }

  unstar(storyId)
  {
    this.user.unstar(storyId)
    this.af.database.list('/stories/' + storyId + '/stared').remove(this.user.id)
  }

}