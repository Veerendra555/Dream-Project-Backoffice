import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  adminData:any;
  id:any=''
  Password:any={};
  fieldTextType: boolean;
  hide = true;
  passwordStatus: boolean =false;
  constructor(public snackBar:MatSnackBar) {
    if(!!localStorage.getItem('bulkiTradeToken'))
    this.id=JSON.parse(localStorage.getItem('userData'))._id
     if(this.id)
     this.getMemberDetails();
      
   }

  ngOnInit(): void {
  }


  getMemberDetails() {
    Axios.get(AppUrls._baseUrl + actionUrl._getMemberById+this.id,{
    })
      .then(response => { 
        console.log(response);
        if (response.data.code == 200 && response.data.type == "success") {
          this.adminData = response.data.data;
          console.log(this.adminData);
          console.log(response.data);
        }
        else{
          this.adminData = [];
        }
         })
      .catch(function (error) {
        console.log(error)
      })
  }

  formSubmit(form:NgForm)
  {
    this.Password.id=this.adminData._id;
    console.log(this.Password)
        Axios.put(AppUrls._baseUrl + actionUrl._changePassword,this.Password,{
      // headers: {
      //   'x-auth' : this.baseService.authToken

      // },
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  passwordCheck()
  {
    if(this.Password.updatePassword == this.Password.confirmPassword )
    {
      this.passwordStatus=false;
    }
    else
    {
      this.passwordStatus = true;
    }
  }


}
