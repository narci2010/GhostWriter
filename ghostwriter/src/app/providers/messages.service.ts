import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { StoriesService } from "./stories.service";
import { AngularFire } from 'angularfire2';

@Injectable()
export class MessagesService {
  private messages = []
  private masked = []
  public story = {
    id: "",
    maskType: "",
    maskLength: 0,
    messagesDisplayed: 0
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
          uid: snapshot.uid,
          avatar: this.user.getAvatar(snapshot.uid),
          author: this.user.getName(snapshot.uid)
        });
      });
      this.masked = this.mask(this.messages.slice())
    })
  }

  mask(m){
    var count = this.story.messagesDisplayed
    if(count != 0 && count < m.length) m = m.splice(m.length - count);
    if(this.story.maskType != "none") m = m.map(x => ({
      uid: x.uid,
      avatar: x.avatar,
      author: x.author,
      text: this.format(x.text, this.story.maskType, this.story.maskLength)
    }));
    if (m.length < this.messages.length) m.unshift({text: " . . . "});
    return m
  }

  getMasked(){
    return this.masked;
  }

  get(count?: number){
    var m = this.messages.slice()
    if(count && count < m.length) m = m.splice(m.length - count, count);
    return m;
  }

  save(data){
    var message = data
    message.uid = this.user.getID()
    this.af.database.object('/stories/' + this.story.id + "/messages/" + String(this.messages.length)).set(message)
  }

  format(message, maskType, maskLength){
    var index = message.search(this.formReg(maskType, maskLength))
    if (index == -1) return message;
    else return " . . . " + message.substring(index);
  }

  formReg(maskType, maskLength){
    switch (maskType) {
      case "letter":
      return new RegExp('(.){' + maskLength + '}[.?! ]*$')
      case "word":
      return new RegExp("(\\w+[ ,&\:\;\'\"]*){"+ maskLength + "}[.?! ]*$")
      case "sentence":
      return new RegExp("([\\w ,&\:\;\'\"]+[.?! ]*){" + maskLength + "}$")
      default:
      return new RegExp(".*")
    }
  }
}
