import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2';

@Injectable()
export class UserService {
  id: ""
  avatar: ""
  email: ""
  name: ""
  desc: ""
  stats: {
    messages: 0,
    stories: 0
  }
  stories: {}
  stared: {}
  userRef
  
  constructor(public af: AngularFire) {
  }

  create(id, data){
    this.af.database.list('/users').update(id, data);
  }

  load(id) {
    return new Promise((resolve, reject) => {
      this.userRef = this.af.database.object('/users/' + id).subscribe(snapshot => {
          this.id = snapshot.$key,
          this.email = snapshot.email,
          this.name = snapshot.name,
          this.desc= snapshot.desc,
          this.stats = snapshot.stats,
          this.avatar = snapshot.avatar,
          this.stories = snapshot.stories,
          this.stared = snapshot.stared
        resolve()
      });
    })
  }

  getAvatar(uid?){
    return new Promise((resolve, reject) => {
      if(uid) this.af.database.object('users/' + uid + '/avatar').subscribe(snapshot => {
        resolve(snapshot.$value)
      });
        else resolve(this.avatar)
      });
  }

  getName(uid?){
    return new Promise((resolve, reject) => {
      if(uid) this.af.database.object('users/' + uid + '/name').subscribe(snapshot => {
        resolve(snapshot.$value)
      });
        else resolve(this.name)
      });
  }

  exists(id){
    return new Promise((resolve, reject) => {
      this.af.database.object('/users/' + id).subscribe( user => {
        if (user) {
          console.log('User id is taken.');
          resolve(true)
        }
        else {
          console.log('User id is not taken.');
          resolve(false)
        }
      }).unsubscribe()  
    });
  }

  save(data){
    this.af.database.list('/users').update(this.id, data);
  }

  delete(){

    this.af.database.list('/users').remove(this.id)
  }

  star(storyId){
    this.af.database.object('/users/' + this.id + "/stared/" + storyId).set(true)
  }

  unstar(storyId)
  {
    this.af.database.list('/users/' + this.id + '/stared').remove(storyId)
  }

}