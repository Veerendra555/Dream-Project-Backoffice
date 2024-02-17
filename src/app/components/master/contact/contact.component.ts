import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';

import { ImageUrls } from 'src/environments/image-urls';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  model: NgbDateStruct;
  contactData:any={
    fullName:'',
    email:"",
    phone:"",
    address:"",
    fbPageUrl:"",
    instalPageUrl:"",
    companyWebsiteUrl:"",
    youTubePageUrl:"",
    linkedInPageUrl:"",
    twitterPageUrl:""
  }
  keyPath:any="";
  imageUrl=ImageUrls.default_imgUrl;
  fullPage: boolean = true;
  public config: any = {
    uiColor: 'transparent',
    // Define the toolbar groups as it is a more accessible solution.
    toolbarGroups: [
      {'name': 'basicstyles', 'groups': ['basicstyles']},
      // {'name': 'links', 'groups': ['links']},
      {'name': 'paragraph', 'groups': ['list', 'blocks']},
      // {'name': 'document', 'groups': ['mode']},
      // {'name': 'insert', 'groups': ['insert']},
      {'name': 'styles', 'groups': ['styles']},
      {'name': 'about', 'groups': ['about']}
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
  };
  submitted: boolean;
  selectedFiles: any;
  statusText: string;
  constructor(  private  router: Router,
    private uploadService : UploadService,
    private _location: Location,
    public snackBar:MatSnackBar) {
      this.getContacthDetails();
     }
  

  formSubmit()
  {
        Axios.post(AppUrls._baseUrl + actionUrl._addContacthDetails,this.contactData,{
      // headers: {
      //   'x-auth' : this.baseService.authToken

      // },
    })
      .then(response => {        
        console.log(response)
        if (response.data.code == 200 && response.data.type == "success") {
          this. getContacthDetails(); 
          this.openSnackBar(response.data.message,'5000','close');
          // form.resetForm("");
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



  getContacthDetails() {
    Axios.get(AppUrls._baseUrl + actionUrl._getContacthDetails,{
     params:{
       role:"Admin"
     }
    })
      .then(response => { 
        console.log(response);
        if (response.data.code == 200 && response.data.type == "success") {
          this.contactData = response.data.data;
          console.log(this.contactData);
          console.log(response.data);
        }
        else{
          this.contactData = {};
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

  backClicked() {
    this._location.back();
  }

  ngOnInit(): void {
  }

}
