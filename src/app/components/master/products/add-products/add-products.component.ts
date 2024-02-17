import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import Axios from 'axios';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { readAndCompressImage } from 'browser-image-resizer';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUrls } from 'src/environments/image-urls';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { countries } from '../../../master/users/user-display/country-data-store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  public countries:any = countries;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  model: NgbDateStruct;
  productData:any={}
  keyPath:any="";
  imageUrl=ImageUrls.default_imgUrl;
  id=null;
  selectedMultipleFiles:any;
  selectedObj: any={};
  closeResult: string;
  dropdownList = [];
  formModel = {
    "selectedItems": []
  };
  imgMainConfig:any = {
    quality: 1,
    maxWidth: 1024,
    maxHeight: 1024,
    autoRotate: true,
    debug: true
  };
  imgSubConfig:any = {
    quality: 1,
    maxWidth: 320,
    maxHeight: 320,
    autoRotate: true,
    debug: true
  };
  catId:any;
  errorStatus = false;
  brandId:any;
  product:any={}
  productStatus:boolean=false;
  uploadsStatus: boolean=false;
  productSubImageUrls:any = [];
  dropdownSettings:IDropdownSettings;
  imageError:any;
  percentDone: number;
  uploadSuccess: boolean;
  size:any;
  width:number;
  height:number;
  selectedFile:any; 
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
  country:any;
  selectedFiles: any;
  statusText: string;
  imagePreview: string | ArrayBuffer;
  constructor(  private  router: Router,
    private uploadService : UploadService,
    private arouter : ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location,
    private authService : AuthServiceService,
    public snackBar:MatSnackBar) { 
      this.catId = this.arouter.snapshot.queryParamMap.get('catId');
      this.brandId = this.arouter.snapshot.queryParamMap.get('brandId');
      this.id = this.arouter.snapshot.queryParamMap.get('productId');
      if(this.id != null)
      {
       this.getProductById();
      }
      //let tmp =[]
      //for(let i=0; i < this.countries.length; i++) {
      //  tmp.push({ id: this.countries[i].code3, itemName: this.countries[i].name });
     // }
    // this.dropdownList = tmp;
  
     }

    // onItemSelect(item: any) {
      //this.country = item.itemName;
     // console.log(item);
     // console.log();
   // }
  //  onSelectAll(items: any) {
   //   console.log(items);
  //  }
   

  formSubmit(form:NgForm)
  {
    this.productData.categorieId = this.catId;
    this.productData.brand = this.brandId;
  //  this.productData.countryOfOrigin = this.country;
   // this.productData.casePerPallet = this.productData.ti *  this.productData.hi;
   // this.productData.casePriceEXW = this.productData.casePriceManufacturer* this.productData.productMarkup/100;
        // this.productData.productMainImageUrl= "https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"; 
        delete this.productData.productImgUrl; 
        
        
        if (this.id == null) {
          this.productData.productImgURL=this.imageUrl+"products/"+this.keyPath;
          this.productData.productSubImageURL=this.productSubImageUrls;
          Axios.post(AppUrls._baseUrl + actionUrl._addProducts,this.productData
            ,{
            headers: {
               'x-auth' : this.authService.authToken
             },
          })
            .then(response => {        
              console.log(response)
              if (response.data.code == 201 && response.data.type == "success") 
              {
                this.openSnackBar(response.data.message,'5000','close');
                this._location.back();
                  //this.backClicked()
              }
              else
              {
                this.openSnackBar(response.data.message,'5000','close');
              }
            })
            .catch(function (error) {
              // this.openSnackBar(response.data.message,'5000','close');
              console.log(error.response.data.message)
            })
        }
       else {
        delete this.productData.isActive;
        delete this.productData.__v;
        Axios.put(
          AppUrls._baseUrl + actionUrl._updateProduct,this.productData,
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
              // this.categorie = {};
              // form.resetForm("");
              this.getProductById();
            
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


  changeStatus()
  {
    this.productStatus=!this.productStatus;
  }
  getProductById(){
    Axios.get(AppUrls._baseUrl + actionUrl._getProductById+this.id,{
      // headers: {
      //   'x-auth' : this.baseService.authToken
      // },
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.productData = response.data.data;
       //   this.formModel.selectedItems = [{ id: response.data.data.countryOfOrigin, itemName: response.data.data.countryOfOrigin }]
          console.log(this.productData);
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

//////Chanking Values
  //checkValue()
  //{
   ////  this.errorStatus = this.productData.productMarkup >= 100 && this.productData.productMarkup <= 200 ? false : true;
     //console.log(this.errorStatus)

  //}

  // ////////////////////Image Code
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
  //         if ( width > 1024 || height > 1024 ) {
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
async selectFile(event) {
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
        if ( width > 320 || height > 320 ) {
                var fileName = event.target.files[0].name;
                let resizedImage = await readAndCompressImage(event.target.files[0], this.imgMainConfig);
                console.log(resizedImage)
                this.selectedFiles = resizedImage;
                this.selectedFiles.name = fileName;
                this.upload();
        } else {
          this.selectedFiles = event.target.files[0];
          console.log(this.selectedFiles)
          this.upload();
        //  this.uploadsStatus=true;
        }
      }, 200);
        };
  }

    } 

    ////////////////////Image Code
    selectFileMultiple(event) {
  console.log(event.target.files)
  console.log(event.target.files.length);
     for(let i=0;i<event.target.files.length;i++)
     {
      let reader = new FileReader();
      console.log(event.target.files[i])
      if (event.target.files && event.target.files.length > 0) {
        console.log("Calling If");
        let file = event.target.files[i]; 
        let img = new Image();
        img.src = window.URL.createObjectURL( file );
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log("Calling reader.onload");
          setTimeout(async () => {
            console.log("setTimeout....");
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            window.URL.revokeObjectURL( img.src );
            console.log(width + '*' + height);
            if ( width > 320 || height > 320 ) {
                    var fileName = event.target.files[i].name;
                    let resizedImage = await readAndCompressImage(event.target.files[i], this.imgSubConfig);
                    console.log(resizedImage)
                    this.selectedFiles = resizedImage;
                    this.selectedFiles.name = fileName;
                    this.uploadMultiple();
                    this.uploadsStatus=true;

            } else {
              this.selectedFiles = event.target.files[i];
              console.log(this.selectedFiles)
              this.uploadMultiple();
               this.uploadsStatus=true;

            }
          }, 200);
            };
      }


      // for (i = 0; i < files.length; i++) {
      //   file = files[i];
      //   reader = new FileReader();
      //   reader.onload = (function(file) {
      //     return function(e) {
      //       var span = document.createElement('span');
      //       span.innerHTML = ['<img src="', e.target.result,
      //         '" title="', escape(file.name), '">'
      //       ].join('');
      //       document.getElementById('list').insertBefore(span, null);
      //     };
      //   })(file);
      //   reader.readAsDataURL(file);
      // }
    }
    
        }  
        
        uploadMultiple() {  // (file)
          console.log("Img Uploads calling...")
          let file = this.selectedFiles;
          let type="productssubimages"
          console.log("UPLOAD", file);
          let self = this;
          self.statusText = "Uploaded.....";
          self.uploadService.uploadFileAny(file ,function (err ,key) {
            if (err) console.log(err);
            console.log('Seccouse ', err, key);
            // self.keyPath=key;
            self.productSubImageUrls.push(self.imageUrl+"productssubimages/"+key);
            console.log(self.productSubImageUrls);
            self.uploadsStatus=false;
            if(self.id != null)
            {
               for(let i=0;i<self.productData.productSubImageURL.length;i++)
               {
                console.log(self.productData.productSubImageURL);
                self.uploadService.deleteImage(self.productData.productSubImageURL[i]);
               }
               self.productData.productSubImageURL = self.productSubImageUrls;
            }

            // self.uploadsStatus=false;
           
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
      

  upload() {  // (file)
    let file = this.selectedFiles;
    let type="products"
    console.log("UPLOAD", file);
    let self = this;
    self.statusText = "Uploaded.....";
    self.uploadService.uploadFileAny(file ,function (err ,key) {
      if (err) console.log(err);
      console.log('Seccouse ', err, key);
      
      self.keyPath=key;
      self.uploadsStatus=false;
      if(self.id != null)
      {
       self.uploadService.deleteImage(self.productData.productImgUrl);
       self.productData.productImgUrl = self.imageUrl+"products/"+self.keyPath;
      }

     
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

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'itemName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  backClicked() {
    this._location.back();
  }

}