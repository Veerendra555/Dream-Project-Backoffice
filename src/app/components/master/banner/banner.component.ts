import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';

import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';

import { ImageUrls } from 'src/environments/image-urls';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
 
  model: NgbDateStruct;
  banner:any={};
  bannerStatus:boolean=false;
  bannerData:any;
  submitted: boolean;
  selectedFiles: any;
  selectedObj: any={};

  closeResult: string;
  uploadsStatus: boolean=false;
  bannerUrl=ImageUrls.default_imgUrl;
  keyPath: string;
  constructor(
    private uploadService : UploadService,
    public snackBar:MatSnackBar,
    private modalService: NgbModal,
    private authservice: AuthServiceService
  ) {
    this.getBanners();
   }

  formSubmit(form:NgForm)
  {
        this.banner.bannerImageUrl=this.bannerUrl+"banners/"+this.keyPath;
        var obj={
          bannerImageUrl : this.banner.bannerImageUrl
        }
        Axios.post(AppUrls._baseUrl + actionUrl._addBanners,obj,{
      headers: {
        'x-auth' : this.authservice.authToken

      },
    })
      .then(response => {        
        console.log(response)
        if (response.data.code == 201 && response.data.type == "success") {
          this.getBanners();
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

  changeStatus()
  {
    this.bannerStatus=!this.bannerStatus;
  }


    
  getBanners() {
    Axios.get(AppUrls._baseUrl + actionUrl._getBanners,{
     params:{
       role:"Admin"
      }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.bannerData = response.data.data;
        }
         })
      .catch(function (error) {
        console.log(error)
      })
  }

  changeBannerStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateBannerStatus,{
        id:data._id,
        isActive:!data.isActive
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == "success") 
        {
          this.openSnackBar(response.data.message,'5000','close');
           this.getBanners();
          // window.location.reload();
        }
        else
        {
          this.openSnackBar(response.data.message,'5000','close');
        }
        // else if(this.baseService.checkToken(response.data.message , response.data.status))
        // {
          
        // }
         })
      .catch(function (error) {
        console.log(error)
      }) 
  }


   

  ////////////////////Image Code
  selectFile(event) {
    console.log("selectFile");
    this.selectedFiles = event.target.files[0];
    this.banner.size = this.selectedFiles.size;
    // this.upload(event.target.files[0]);
    this.upload();
    this.uploadsStatus=true;
  } 

  upload() {  // (file)
    let file = this.selectedFiles;
    let type="banners"
    console.log("UPLOAD", file);
    let self = this;
    self.uploadService.uploadFileAny(file ,function (err ,key) {
      if (err) console.log(err);
      console.log('Seccouse ', err, key);
      self.keyPath=key;
      self.uploadsStatus=false;
    //   else {
    //      console.log(key);
    //     // axios.post(self.baseurl + 'admin/api/media/', { "name": self.name, "key": key ,"type":"img"}, {
        //   headers: { 'x-auth': self.token }
        // })
          // .then(response => {
          //   console.log(response);
          //   self.statusText = "Image Uploaded Succesfully";
          //   self.getAllMedia();
          // }).catch((error) => {
          //   // handle error
          //   console.log("0000", error);
          //   self.statusText = "Image Uploaded Error";
          // }).
          // finally(() => {
          //   // always executed
          //   // this.loading = true;
          //   self.selectedFiles = {};
          // });
      // };
    });
  }

  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  deleteBanner(data)
  {
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Are you sure? Delete This Image Permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
      this.uploadService.deleteImage(data.bannerUrl);  
    Axios.delete(AppUrls._baseUrl + actionUrl._deleteBanner+data._id,{
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.code == 200 && response.data.type == "success") 
        {
          this.openSnackBar(response.data.message,'5000','close');
           this.getBanners();
        }
        else 
        {
          this.openSnackBar(response.data.message,'5000','close');
        }
        // else if(this.baseService.checkToken(response.data.message , response.data.status))
        // {
          
        // }
         })
      .catch(function (error) {
        console.log(error)
      })
    }
   })
  }

  ngOnInit(): void {
  }

}
