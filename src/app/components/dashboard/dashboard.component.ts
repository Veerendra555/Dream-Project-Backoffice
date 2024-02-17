 import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { AppUrls ,actionUrl} from 'src/environments/app-urls';
import { HttpService } from 'src/app/services/http.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ImageUrls } from 'src/environments/image-urls'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Axios from 'axios';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  url:String=AppUrls._adminModuleUrl;
  LoggedData:any=[];
  dashboardCount:any={
    userCount:0,
    partnerCount:0,
    pendingCount:0,
    categoryCount:0,
    addonsCount:0,
    completedCount:0 
  };
 


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

 
  constructor(
    private http:HttpService,
    public snackBar :MatSnackBar,
    private authService : AuthServiceService,
    private _router: Router
  ) {
    this.getDashboardCount();
  }


  getDashboardCount() {
    Axios.get(AppUrls._baseUrl + actionUrl._dashboardCount,{
      headers: {
        'x-auth' : this.authService.authToken
      },
    })
      .then(response => { 
        console.log(response)
        if (response.data.code == 200 && response.data.type == "success") 
        {
          this.dashboardCount = response.data.data;
          console.log(this.dashboardCount);
          console.log(response.data);
        }
        // else if(this.authService.checkToken(response.data.message , response.data.status))
        // {
          
        // }
         })
      .catch(function (error) {
        console.log(error)
      })
  }


   ngOnInit() {
     console.log("dashboard Working...")
  }
  

  viewData(id)
  {
   this._router.navigate(['/view-single-employee-data/'],{queryParams :{id:id} });
  }
    
 openStcakBar(msg,duration,action?)
 {
   this.snackBar.open(msg,action,{
     duration
   })
 }

}
