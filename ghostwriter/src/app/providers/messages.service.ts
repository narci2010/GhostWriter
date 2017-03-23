import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { StoriesService } from "./stories.service";
import { AngularFire } from 'angularfire2';

@Injectable()
export class MessagesService {
  private messages = []
  private story = {
    id: ""
  }

  constructor(
    public af: AngularFire,
    public user: UserService,
    public stories: StoriesService) {
  }

  load(sid){
    this.story.id = sid
    this.af.database.list('/stories/' + sid + '/messages').subscribe(snapshots => {
      this.messages = []
      snapshots.forEach(snapshot => {     
        this.messages.push({
          text: snapshot.text,
          uid: snapshot.uid
        });
      });
    })
  }

  get(count?){
    if(count) return this.messages.slice(0, count);
    else return this.messages;
  }

  save(data){
    var message = data
    message.uid = this.user.getID()
    this.af.database.object('/stories/' + this.story.id + "/messages/" + String(this.messages.length)).set(message)
  }
}
