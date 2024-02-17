import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { UploadService } from "src/app/services/upload.service";
import Axios from 'axios';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {

  
  model: NgbDateStruct;
  flag:boolean=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  store:any={}
  warningStatus:boolean=false;
  clientId:any;
  eventData: any;
  closeResult = '';
  selectedObj:any = {};
  displayCount:any;
  constructor(private router: Router,
    private arouter : ActivatedRoute, private uploadService:UploadService, public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.clientId = this.arouter.snapshot.queryParamMap.get('client');
    if(this.clientId != null)
    {
     this.getEventsById();
    }

  }

  //////Get Data

  getEventsById(){
    Axios.get(AppUrls._baseUrl + actionUrl._getEventsById+this.clientId,{
      // headers: {
      //   'x-auth' : this.baseService.authToken
      // },
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
          this.eventData = response.data.data;
          console.log(this.eventData);
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

  
  getCategoriesNames() {
    Axios.get(AppUrls._baseUrl + actionUrl._getCategories,{
     params:{
       role:"Admin"
     }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
           this.eventData = response.data.data;
          console.log(this.eventData);
          console.log(response.data);
          this.getCount();
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
    this.displayCount = this.eventData.filter((data)=>data.displayStatus == true).length;
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
           this.getCategoriesNames();
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
                 this.getCategoriesNames();
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
            this.getCategoriesNames();
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
        this.getCategoriesNames();
      }
  }
  ///////////////////View Sub Categoires

  addEvent()
  {
    this.router.navigate(['/add-event'],{queryParams: {client:this.clientId}})
  }

  viewData(data)
  {
    this.router.navigate(['/view-brands'],{queryParams: {CatName:data.categoryName,catId : data._id}})
  }

/////////////////Edit Data
editData(id)
{
  this.router.navigate(['/add-categorie'],{queryParams: {catId : id}})
}
  ////////////////Delete Categoire
  deleteCategorie(data)
  {
    if(confirm("Do You Delete This Record Permanently"))
    {
    this.uploadService.deleteImage(data.imageURL.split('.com/')[1]);
    Axios.delete(AppUrls._baseUrl + actionUrl._deleteCategorie+data._id,{
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.code == 200 && response.data.type == 'success') {
          this.openSnackBar(response.data.message,'5000','close');
           this.getCategoriesNames();
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
  ngOnInit(): void {
  }



  
  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the eventData
    this.dtTrigger.unsubscribe();
  }

}

