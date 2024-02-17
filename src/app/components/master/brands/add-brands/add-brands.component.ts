import {  Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { readAndCompressImage } from 'browser-image-resizer';
import { ImageUrls } from 'src/environments/image-urls';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  model: NgbDateStruct;
  brand:any={}
  keyPath:any="";
  coverKeyPath:any="";
  id:any = null;
  imageURL:any;
  advImageUrls:any = [];
  catId:any = null;
  selectedObj: any={};
  closeResult: string;
  imgConfig:any = {
    quality: 1,
    maxWidth: 320,
    maxHeight: 320,
    autoRotate: true,
    debug: true
  };
  imageUrl=ImageUrls.default_imgUrl;
  fullPage: boolean = true;
  brandStatus:boolean=false;
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
    private modalService: NgbModal,
    private authService : AuthServiceService,
    public snackBar:MatSnackBar) { 
      this.catId = this.arouter.snapshot.queryParamMap.get('catId');
      this.id = this.arouter.snapshot.queryParamMap.get('id');
      if(this.id != null)
      {
       this.getBrandById();
      }
    }
  

  formSubmit(form:NgForm)
  {
     this.brand.category_id = this.catId;
    //  this.brand.brandImageUrl= "https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";   
    
        if (this.id == null) {
          this.brand.brandImgUrl=this.imageUrl+"brands/"+this.keyPath;
          this.brand.coverImageUrl=this.imageUrl+"brands/"+this.coverKeyPath;
         // this.brand.advertiseImageUrl= this.advImageUrls;
          Axios.post(AppUrls._baseUrl + actionUrl._addBrands,this.brand,{
            headers: {
              'x-auth' : this.authService.authToken
            },
          })
            .then(response => {        
              console.log(response)
              if (response.data.code == 201 && response.data.type == 'success' ) 
              {
               
                this.openSnackBar(response.data.message,'5000','close');
                this._location.back();
             
                // form.resetForm("");
          //this.backClicked();
            
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
        delete this.brand.isActive;
        delete this.brand.__v;
        Axios.put(
          AppUrls._baseUrl + actionUrl._updateBrand,this.brand,
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
              this.backClicked();
              // this.Brand = {};
              // form.resetForm("");
              this.getBrandById();
              
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
    this.brandStatus=!this.brandStatus;
  }
  getBrandById(){
    Axios.get(AppUrls._baseUrl + actionUrl._getBrandsById+this.id,{
      // headers: {
      //   'x-auth' : this.baseService.authToken
      // },
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.brand = response.data.data;
          console.log(this.brand);
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
  // selectFile(event) {
  //   let reader = new FileReader();
  //   if (event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
    
  //     let img = new Image();
    
  //     img.src = window.URL.createObjectURL( file );
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setTimeout(() => {
  //         const width = img.naturalWidth;
  //         const height = img.naturalHeight;
    
  //         window.URL.revokeObjectURL( img.src );
  //         console.log(width + '*' + height);
  //         if ( width > 320 || height > 320 ) {
  //           alert('Image should be below 320 x 320 size');
  //           this.myInputVariable.nativeElement.value = '';
  //         } else {
  //           this.selectedFiles = event.target.files[0];
  //           this.upload();
  //           this.uploadsStatus=true;
  //         }
  //       }, 200);
  //         };
  //   }
  
  //     } 

  
  ////////////////////Image Code
async selectFile(event,name:any) {
  let reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    this.uploadsStatus=true;
    let file = event.target.files[0]; 
    let img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTimeout(async () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL( img.src );
        console.log(width + '*' + height);
        if (name != "cover" && width > 320 || height > 320 ) {
                var fileName = event.target.files[0].name;
                let resizedImage = await readAndCompressImage(event.target.files[0], this.imgConfig);
                console.log(resizedImage)
                this.selectedFiles = resizedImage;
                this.selectedFiles.name = fileName;
                this.upload(name);
        } else {
          this.selectedFiles = event.target.files[0];
          console.log(this.selectedFiles)
          this.upload(name);
       //  this.uploadsStatus=true;
        }
      }, 200);
        };
  }

    } 


  upload(name) {  // (file)
    let file = this.selectedFiles;
    let type="brands"
    console.log("UPLOAD", file);
    let self = this;
    self.statusText = "Uploaded.....";
    self.uploadService.uploadFileAny(file ,function (err ,key) {
      if (err) console.log(err);
      console.log('Seccouse ', err, key);
       if(name == "image")
       self.keyPath=key;
       else                              //if(name == "cover")
       self.coverKeyPath=key;
      self.uploadsStatus=false;
      console.log("UPLOAD..")
      if(self.id != null)
      {
        console.log("If block Working...",name)
       self.uploadService.deleteImage(name == "image" ? self.brand.brandImgUrl : self.brand.coverImageUrl);
       if(name == "image")
       self.brand.brandImgUrl = self.imageUrl+"brands/"+self.keyPath;
       else
       self.brand.coverImageUrl = self.imageUrl+"brands/"+self.coverKeyPath;
      }  
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
