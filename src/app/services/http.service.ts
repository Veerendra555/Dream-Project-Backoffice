import { Injectable, NgZone } from '@angular/core';
import { AppUrls ,actionUrl} from 'src/environments/app-urls';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl: string = AppUrls._baseUrl;
  private _locationObject = new Subject<string>();
  locationObject$ = this._locationObject.asObservable();

  constructor(private http: HttpClient, private _router: Router,public snackBar:MatSnackBar) {}

  ngOnInit() {}

  get(subUrl, token?) {
    let myheader = new HttpHeaders();
    token = localStorage.getItem('token');
    myheader =
      token != null
        ? myheader
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + token)
        : myheader.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(this.baseUrl + subUrl, { headers: myheader }).pipe(
      map(
        (res) => {
          return res;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

   postNew(url, paramsObj?, token?) {
    let myheader = new HttpHeaders();
    if (token != null) {
      myheader = myheader
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token);
    } else {
      myheader = myheader.set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
    }
    let body = null;
    if (paramsObj) {
      for (var key in paramsObj) {
        body = body === null ? new HttpParams() : body;
        body = body.set(`${key}`, `${paramsObj[key]}`);
      }
      return this.http.post(this.baseUrl + url, body, { headers: myheader });
    }
  }

  headersNG(token){
    let myheader = new HttpHeaders();
    myheader =
      token != undefined
        ? myheader
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + token)
        : myheader.set('Content-Type', 'application/x-www-form-urlencoded');
        return myheader;
  }

  post(url, paramsObj, token?): Observable<any> {
    let myheader = new HttpHeaders();
    myheader =
      token != undefined
        ? myheader
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + token)
        : myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    let body: HttpParams = null;

    if (paramsObj) {
      for (var key in paramsObj) {
        body = body === null ? new HttpParams() : body;
        // body = body.set(key, paramsObj[key].toString());
        body = body.append(key, paramsObj[key]);
      }
    }
    return this.http
      .post(this.baseUrl + url, body, {
        headers: myheader,
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  loggedIn()
  {
    //  return !!localStorage.getItem('gearUpToken');
    // Axios.get(AppUrls._baseUrl + "secure",{
    //   headers: {
    //     'x-auth' : localStorage.getItem('gearUpToken')
    //   },
    // })
    //   .then(response => {        
    //     console.log(response)
    //     if (response.data.isSuccess) {
    //       // this.openSnackBar(response.data.message,'5000','close');
    //       return true;
    //     }
    //     else
    //     {
    //       return false;
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //     return false;
    //   })
      // return false;
      return !!localStorage.getItem('bulkiTradeToken');
  }
  /* postObj(subUrl, paramsObj?, token?): Observable<any> {
    let myheader = new HttpHeaders();
    token = localStorage.getItem('token');
    myheader =
      token != null
        ? myheader
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + token)
        : myheader.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.baseUrl + subUrl, paramsObj, {
      headers: myheader,
    });
  } */


  

  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

}
