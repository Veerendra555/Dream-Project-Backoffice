import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SharedServiceService} from '../../../shared/service/shared-service.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  togglebtn:boolean;
  token: string;
  constructor(public _sharedata:SharedServiceService, private _router: Router) {
  // this.togglebtn= this._sharedata.getter();
  // console.log(this.togglebtn);
   }

  ngOnInit() {
    // this.token = localStorage.getItem('token');
    // if(!!this.token){
    // } else {
    //   localStorage.removeItem('token');
    //      localStorage.removeItem('userData');
    //      this._router.navigate(['/auth/login']);
    // }
    // console.log("Value Change1");
  }
  
 
}
