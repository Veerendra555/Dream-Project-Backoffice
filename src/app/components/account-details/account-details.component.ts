import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account:any={};
  id:any = null;
  constructor(private  router: Router,
    private arouter : ActivatedRoute,
    private authService : AuthServiceService,
    public snackBar:MatSnackBar) {
      this.getAccountDetails();
     }

     formSubmit(form:NgForm)
     {
       Axios.post(AppUrls._baseUrl + actionUrl._addAccountDetails,this.account,{
         // headers: {
          //  'x-auth' : this.authService.authToken
        //  },
        })
        .then(response => {        
          console.log(response)
          if (response.data.isSuccess) {
            this.openSnackBar(response.data.message,'5000','close');
            form.resetForm("");
          }
          else
          {
            this.openSnackBar(response.data.message,'5000','close');
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      
    }



     getAccountDetails(){
      Axios.get(AppUrls._baseUrl + actionUrl._getAccountDetails,{
        // headers: {
        //   'x-auth' : this.baseService.authToken
        // },
      })
        .then(response => { 
          if (response.data.code == 200 && response.data.type == 'success') {
            this.account = response.data.data;
            console.log(this.account);
            console.log(response.data);
          }
          // else if(this.baseService.checkToken(response.data.message , response.data.status))
          // {
            
          // }
           })
        .catch(function (error) {
          console.log(error)
        })
    }

    openSnackBar(msg, duration, action?) {
      this.snackBar.open(msg, action, {
        duration: duration,
      });
    }
    
  ngOnInit(): void {
  }

}
