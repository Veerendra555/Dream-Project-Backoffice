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
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  model: NgbDateStruct;
  flag:boolean=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  store:any={}
  catId:any;
  id:any = null;
  brandId:any;
  warningStatus:boolean=false;
 productsData: any;
 brandName:any;
  closeResult = '';
  selectedObj:any = {};
  constructor(private router: Router,
    private arouter : ActivatedRoute,
    private uploadService:UploadService, public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.catId = this.arouter.snapshot.queryParamMap.get('catId');
    this.brandId = this.arouter.snapshot.queryParamMap.get('brandId');
    this.brandName = this.arouter.snapshot.queryParamMap.get('brandName');
   
    this.getProductsByBrandId();
  }

  //////Get Data
  
  getProductsByBrandId() {
    Axios.get(AppUrls._baseUrl + actionUrl._getProductsByBrandId+this.brandId,{
     params:{
       role:"Admin"
     }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.productsData = response.data.data;
          console.log(this.productsData);
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


  changeProductStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateProductStatus,{
        id:data._id,
        isActive:!data.isActive
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getProductsByBrandId();
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
    this.router.navigate(['/'],{queryParams: {brandName:data.brandName,brandId : data._id}})
  }

  addProduct()
  {
    this.router.navigate(['/add-products'],{queryParams: {catId:this.catId,brandId : this.brandId}})
  }

/////////////////Edit Data
editData(id)
{
  this.router.navigate(['/add-products'],{queryParams: {catId:this.catId,brandId : this.brandId,productId : id}})
}
  ////////////////Delete Categoire
  deleteProduct(data)
  {
    if(confirm("Do You Delete This Record Permanently"))
    {
    this.uploadService.deleteImage(data.productImgURL.split('.com/')[1]);
    Axios.delete(AppUrls._baseUrl + actionUrl._deleteCategorie+data._id,{
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getProductsByBrandId();
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


  /////////////////Edit Data
// editProduct(id)
// {
//   this.router.navigate(['/add-products'],{queryParams: {productId : id}})
// }


  updateStatus(data)
  {
    Axios.put(
      AppUrls._baseUrl + actionUrl._updateProduct,data,
    )
      .then(response => {
        console.log('resp: ', response);
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.openSnackBar(response.data.message,'5000','close');
          // this.categorie = {};
          // form.resetForm("");
          this.getProductsByBrandId();
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


  open(content,selObj) {
    console.log(selObj);
    this.selectedObj = selObj;
    // this.selectedObj.slot =  Date.parse(selObj.slot)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("LLLLLLL",result);
      Axios.put(AppUrls._baseUrl + actionUrl._updateProduct,result,{
       })
        .then(response => {        
          console.log(response)
          if (response.data. status) {
            this.openSnackBar(response.data.message,'5000','close');
            this.getProductsByBrandId();
          }
          else{
            this.openSnackBar(response.data.message,'5000','close');
           }
        })
        .catch(function (error) {
          console.log(error)
        })
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

  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

