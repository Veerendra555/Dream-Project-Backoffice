import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authToken: any;
  constructor(
    private _http:HttpService,
    public snackBar:MatSnackBar,
    private _router:Router
  ) { 
    this.authToken = localStorage.getItem("bulkiTradeToken");
    
  }
  canActivate() : boolean
  {
  if(this._http.loggedIn())
  {
    return true;
  }
  else
  {
    // location.reload();
    localStorage.clear();
    location.href='/auth/login';
    return false;
  }
  }

  checkToken(msg , status)
  {
    if(msg == "Invalid Token" && status == false)
    {
      this.openSnackBar('Invalid Token Please Login Again','5000','close');
      // localStorage.clear();
       localStorage.clear();
       location.href='/auth/login';
      return false;
    }
    else
    {
     return true; 
    }
  }

  update()
  {
    this.authToken = localStorage.getItem("bulkiTradeToken");
  }

  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

}
