import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2';

@Injectable()
export class UserService {
  user = {
    id: "",
    email: ""
  };

  constructor(public af: AngularFire) {
  }

  create(id, data){
    this.af.database.list('/users').update(id, data);
  }

  set(data) {
    this.user = data;
  }

  get(){
    return this.user;
  }

  getID(){
    return this.user.id;
  }

  save(data){
    this.af.database.list('/users').update(this.user.id, data);
  }

  delete(){
    this.af.database.list('/users').remove(this.user.id);
  }
}