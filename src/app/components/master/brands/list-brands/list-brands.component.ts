import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { UploadService } from "src/app/services/upload.service";
import Axios from 'axios';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {

  
  model: NgbDateStruct;
  flag:boolean=true;
  id:any = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  store:any={}
  warningStatus:boolean=false;
  brandsData: any;
  closeResult = '';
  selectedObj:any = {};
  constructor(private router: Router,private uploadService:UploadService, 
    private arouter : ActivatedRoute,
    public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.id = this.arouter.snapshot.queryParamMap.get('catId');
    this.getBrandsNames();
  }

  //////Get Data
  
  getBrandsNames() {
    Axios.get(AppUrls._baseUrl + actionUrl._getBrandsByCatId+this.id,{
     params:{
       role:"Admin"
     }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.brandsData = response.data.data;
          console.log(this.brandsData);
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


  changeBrandsStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateBrandStatus,{
        id:data._id,
        isActive:!data.isActive
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getBrandsNames();
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
  ///////////////////View Sub Categoires
  viewData(data)
  {
    this.router.navigate(['/view-products'],{queryParams: {catId : this.id,brandId : data._id}})
  }

  addBrand()
  {
    this.router.navigate(['/add-brands'],{queryParams: {catId : this.id}})
  }

/////////////////Edit Data
editData(id)
{
  this.router.navigate(['/add-brands'],{queryParams:  {id : id, catId : this.id}})
}
  ////////////////Delete Categoire
  deleteBrand(data)
  {
    if(confirm("Do You Delete This Record Permanently"))
    {
    this.uploadService.deleteImage(data.imageURL.split('.com/')[1]);
    Axios.delete(AppUrls._baseUrl + actionUrl._deleteCategorie+data._id,{
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.isSuccess) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getBrandsNames();
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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

