import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../../../shared/service/shared-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  togglebtn:boolean;
  name:String='';
  constructor(private _sharedata:SharedServiceService,
     ) {
       if(!!localStorage.getItem('bulkiTradeToken'))
        this.name=JSON.parse(localStorage.getItem('userData')).name;
      }

  ngOnInit() {
  }
  clickbtn()
  {
    this._sharedata.setter();
  }
  logOut()
  {
    localStorage.clear();
    location.href='/auth/login';
  }
 
}
