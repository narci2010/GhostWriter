import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2';

@Injectable()
export class UserService {
  private user
  userRef
  
  constructor(public af: AngularFire) {
  }

  create(id, data){
    this.af.database.list('/users').update(id, data);
  }

  load(id) {
    return new Promise((resolve, reject) => {
      this.userRef = this.af.database.object('/users/' + id).subscribe(snapshot => {
        this.user = {
          id: snapshot.$key,
          email: snapshot.email,
          name: snapshot.name,
          desc: snapshot.desc,
          stats: snapshot.stats,
          avatar: snapshot.avatar,
          stories: snapshot.stories
        }
        resolve()
      });
    })
  }

  get(){
    return this.user;
  }

  getID(){
    return this.user.id;
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
    this.af.database.list('/users').update(this.user.id, data);
  }

  delete(){
    
    this.af.database.list('/users').remove(this.user.id)
  }
}