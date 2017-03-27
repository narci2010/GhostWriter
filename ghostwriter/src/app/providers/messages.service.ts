import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { StoriesService } from "./stories.service";
import { AngularFire } from 'angularfire2';

@Injectable()
export class MessagesService {
  private messages = []
  public story = {
    id: "",
    rules: {
      visibility: "",
      visibleNumber: 0
    }
  }

  constructor(
    public af: AngularFire,
    public user: UserService,
    public stories: StoriesService) {
  }

  load(sid){
    this.story = this.stories.getbyId(sid)
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

  get(count?: number, reg?: string, num?: number){
    var m = this.messages.slice()

    if(count && count < m.length) m = m.splice(m.length - count, count);

    if(reg) m = m.map(x => ({
      uid: x.uid,
      text: this.format(x.text, reg, num)
    }));

      return m;
    }

    save(data){
      var message = data
      message.uid = this.user.getID()
      this.af.database.object('/stories/' + this.story.id + "/messages/" + String(this.messages.length)).set(message)
    }

    format(message, reg, num){
      var index = 0, temp
      var tempMessage = message
      for (var i = num; i > 0; i--) {
        temp = tempMessage.lastIndexOf(reg)
        if (temp != -1) {
          index = temp
          tempMessage = tempMessage.substring(0, temp)
        }
        else { index = 0; break; }
      }
      return index != 0 ?  " . . . " + message.substring(index) : message.substring(index)
    }

  }
