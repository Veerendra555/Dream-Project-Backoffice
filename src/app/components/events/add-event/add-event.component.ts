import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { readAndCompressImage } from 'browser-image-resizer';
import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUrls } from 'src/environments/image-urls';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  model: NgbDateStruct;
  id:any = null;
  clientId:any = null;
  event:any={}
  keyPath:any="";
  imagePathUrl=ImageUrls.imageUrl;
  imageUrl:any;
  imgConfig:any = {
    quality: 1,
    maxWidth: 600,
    maxHeight: 800,
    minWidth: 600,
    minHeight: 800,
    autoRotate: true,
    debug: true
  };
  fullPage: boolean = true;
  categorieStatus:boolean=false
  selectedObj: any={};
  closeResult: string;
  uploadsStatus: boolean=false;

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
    private arouter : ActivatedRoute,
    private _location: Location,
    private authService : AuthServiceService,
    private modalService: NgbModal,
    // private ng2ImgMaxService: Ng2ImgMaxService,
    public snackBar:MatSnackBar) {
      this.clientId = this.arouter.snapshot.queryParamMap.get('client');
      this.id = this.arouter.snapshot.queryParamMap.get('id');
      if(this.id != null)
      {
       this.getCategorieById();
      }
     }
  

  formSubmit(form:NgForm)
  {
    // this.event.categorieImageUrl= "https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"; 
     delete this.event.eventImageUrl;
     delete this.event.imageURL;
     this.event.eventImageUrl = this.imageUrl;
     this.event.clientId = this.clientId;
    if (this.id == null) {
    Axios.post(AppUrls._baseUrl + actionUrl._addEvent,this.event)
      .then(response => {        
        console.log(response)
        if (response.data.code == 201 && response.data.type == "success") 
        {
          this.openSnackBar(response.data.message,'5000','close');
          this.router.navigateByUrl('view-event');
          this.backClicked()
        }
        else
        {
          this.openSnackBar(response.data.message,'5000','close');
        }
      })
      .catch(function (error) {
        // this.openSnackBar(response.data.message,'5000','close');
        console.log(error)
      })
  }
 else {
  delete this.event.isActive; 
  delete this.event.__v;
  delete this.event.displayStatus;
  Axios.put(
    AppUrls._baseUrl + actionUrl._updateCategorie,this.event,
    // {
    //   headers:{
    //     'Authorization' : "Bearer "+ localStorage.getItem("CylinderManagmentToken") 
    //   }
    // }
  )
    .then(response => {
      console.log('resp: ', response);
      if (response.data.code == 200 && response.data.type == 'success' ) {
        this.openSnackBar(response.data.message,'5000','close');
        // this.event = {};
        // form.resetForm("");
        this.getCategorieById();
        this.router.navigateByUrl('view-event');
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
   
  }
  changeStatus()
  {
    this.categorieStatus=!this.categorieStatus;
  }

  getCategorieById(){
    Axios.get(AppUrls._baseUrl + actionUrl._getEventsById+this.id,{
      // headers: {
      //   'x-auth' : this.baseService.authToken
      // },
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.event = response.data.data;
          console.log(this.event);
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



    ////////////////////Image Code
  // async selectFile(event) {
  //     console.log("selectFile");
  //       // this.ng2ImgMaxService.resize([event.target.files[0]], 2000, 1000).subscribe((result)=>{
  //       // console.log(result);
  //       // this.selectedFiles = event.target.files[0];
  //       // this.selectedFiles = result;
  //       // this.upload();
  //     // });
  //     // this.upload(event.target.files[0]);
    
  //     try {
  //       let resizedImage = await readAndCompressImage(event.target.files[0], this.imgConfig);
  //       console.log(resizedImage)
  //       this.selectedFiles = resizedImage;
  //       this.upload();
  //     } catch (error) {
  //       console.error(error);
  //       throw(error);
  //     }

  


  //   } 

  ////////////////////Image Code
async selectFile(event) {
    // let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.uploadsStatus=true;
    
      let file = event.target.files[0]; 
      // let img = new Image();
      // img.src = window.URL.createObjectURL( file );
      // reader.readAsDataURL(file);
      // reader.onload = () => {

        setTimeout(async () => {
          const width = file.width;
          const height = file.height;
          // window.URL.revokeObjectURL( img.src );
          console.log(width + '*' + height);
          if ( width > 320 || height > 320 ) {
                  var fileName = event.target.files[0].name;
                  let resizedImage = await readAndCompressImage(event.target.files[0], this.imgConfig);
                  console.log(resizedImage)
                  this.selectedFiles = resizedImage;
                  this.selectedFiles.name = fileName;
                  this.upload();
          } else {
            this.selectedFiles = event.target.files[0];
            console.log(this.selectedFiles)
            this.upload();
          // this.uploadsStatus=true;
          }
        }, 200);
    
          // };
          // 
    }
  
      } 


  upload() {  // (file)
    let file = this.selectedFiles;
    let type="categories"
    console.log("UPLOAD", file);
    let self = this;
    self.statusText = "Uploaded.....";
    self.uploadService.uploadFileAny(file ,function (err ,key) {
      if (err) console.log(err);
      console.log('Seccouse ', err, key);
      self.keyPath=key;
      // self.imageUrl = self.imagePathUrl+key;
      if(self.imageUrl)
      {
       self.uploadService.deleteImage(self.imageUrl.split('.com/')[1]);
      }
      self.imageUrl = self.imagePathUrl+key;
      self.uploadsStatus=false;
      // if(self.id != null)
      // {
      //  self.uploadService.deleteImage(self.event.imageURL);
      //  self.event.imageURL=self.imageUrl+"categories/"+self.keyPath;
      // }
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

    /////////////Image Show Popup
    open(content,selObj) {
      console.log(selObj);
      this.selectedObj.path = selObj;
      // this.selectedObj.slot =  Date.parse(selObj.slot)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log("LLLLLLL",result);
      }, (reason) => {
        console.log("OOOOOOOOOOo",);
        
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  
 


  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }

}

