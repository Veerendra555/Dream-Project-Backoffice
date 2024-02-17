import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  isShowSideMenu: boolean = false;
  // toggle side menu start
  setter() {
    console.log(!this.isShowSideMenu)
    return this.isShowSideMenu = !this.isShowSideMenu;
  }
  getter()
  {
    return this.isShowSideMenu;
  }
  // ChangeVal(val)
  // {
  //   console.log(!val);
  //   console.log("Value Change");
  //  return this.isShowSideMenu=true
  // }
  // toggle side menu end

  constructor() { }
}
