import { Component, OnInit ,VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { UploadService } from "src/app/services/upload.service";
import Axios from 'axios';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  model: NgbDateStruct;
  flag:boolean=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  store:any={}
  warningStatus:boolean=false;
  clientsData: any;
  closeResult = '';
  selectedObj:any = {};
  displayCount:any;
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  constructor(private router: Router,private uploadService:UploadService, public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.getClients();

  }

  //////Get Data
  
  getClients() {
    Axios.get(AppUrls._baseUrl + actionUrl._getClient,{
     params:{
       role:"Admin"
     }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
           this.clientsData = response.data.data;
          console.log(this.clientsData);
          console.log(response.data);
          if(this.flag)
          {
          this.dtTrigger.next();
            this.flag=false;
          }
        }
        // else if(this.baseService.checkToken(response.data.message , response.data.status))
        // {
          
        // }
         })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  getCount()
   {
    this.displayCount = this.clientsData.filter((data)=>data.displayStatus == true).length;
   }

  changeCategoriesStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateCategorieStatus,{
        id:data._id,
        isActive:!data.isActive,
        displayStatus: data.displayStatus
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.openSnackBar(response.data.message,'5000','close');
           this.getClients();
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

  changeCategoriesDisplayStatus(data)
  {
      if(data.displayStatus || this.displayCount<6)
       {
        Swal.fire({
          // title: 'Are you sure?',
          text: 'Are you sure? Want to change Display Status',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.put(AppUrls._baseUrl + actionUrl._updateCategorieStatus,{
              id:data._id,
              isActive: data.isActive,
              displayStatus: !data.displayStatus
          })
            .then(response => { 
              if (response.data.code == 200 && response.data.type == 'success') {
                this.openSnackBar(response.data.message,'5000','close');
                 this.getClients();
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
          else{
            this.getClients();
          }
        })
      }
      else
      {
        Swal.fire({
          // title: 'Are you sure?',
          text: 'Categories Display Max 6 Items',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          cancelButtonText: 'No',
        })
        this.getClients();
      }
  }
  ///////////////////View Sub Categoires
  viewData(data)
  {
    this.router.navigate(['/view-brands'],{queryParams: {CatName:data.categoryName,catId : data._id}})
  }

/////////////////Edit Data
addEvent(id)
{
  this.router.navigate(['/list-event'],{queryParams: {client : id}})
}

editClient(id){
  this.router.navigate(['/add-client'],{queryParams: {client : id}}) 
}


viewQrCode(id)
{

}
  ////////////////Delete Categoire
 async deleteClient(data)
  {
    if(confirm("Do You Delete This Record Permanently"))
    {
    await this.deleteImages(data.bannerImages);
    await this.deleteImages(data.carouselImages);
    await this.uploadService.deleteImage(data.videoUrl.split('.com/')[1]);
    data.isActive = false;
    Axios.put(AppUrls._baseUrl + actionUrl._updateClient,{
    data
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.code == 200 && response.data.type == 'success') {
          this.openSnackBar(response.data.message,'5000','close');
           this.getClients();
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
  }

 async deleteImages(imageList)
  {
   for(let i=0;i<imageList.length;i++)
   {
    await this.uploadService.deleteImage(imageList[i].split('.com/')[1]);
   }
  }
  ngOnInit(): void {
  }

     /////////////Image Show Popup
     open(content,id,data) {
      console.log(id);
      this.value = `http://ec2-13-233-154-118.ap-south-1.compute.amazonaws.com/client/wedding?id=${id}`;
      this.selectedObj = data;
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

      saveAsImage(parent:any) {
    // fetches base 64 date from image
    const parentElement = parent.qrcElement.nativeElement.querySelector("img").src;
    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, this.selectedObj.clientName+'&'+this.selectedObj.partnerName);
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.selectedObj.clientName+'&'+this.selectedObj.partnerName}`;
      link.click();
    }

  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }



  
  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

