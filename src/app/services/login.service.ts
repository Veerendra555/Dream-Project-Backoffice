import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _userData: any;
  // public message = new Subject<object>();

  constructor(private _router: Router) {}

  setAdminData(userObj): void {
    localStorage.setItem('adminData', JSON.stringify(userObj));
    // this.message.next({ avilableUserData: true });
  }

  getAdminData() {
    let localStoreData = localStorage.getItem('adminData');
    if (localStoreData != null && localStoreData) {
      try {
        this._userData = JSON.parse(localStoreData);
        this._userData['isActive'] = true;
        return this._userData;
      } catch (e) {
        localStorage.clear();
        return false;
      }
    } else {
      return false;
    }
  }
}
