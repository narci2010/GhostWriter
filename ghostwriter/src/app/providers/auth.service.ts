import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AuthService {
  constructor(public af: AngularFire) {}


  signup(_credentials){
    return this.af.auth.createUser(_credentials);
  }

  login(_credentials) {
    return this.af.auth.login(_credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    })
  }

  loginGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  isLoggedIn(){

  }

  logout() {
    return this.af.auth.logout();
  }
}