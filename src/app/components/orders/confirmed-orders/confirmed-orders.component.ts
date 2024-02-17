import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import Axios from 'axios';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-confirmed-orders',
  templateUrl: './confirmed-orders.component.html',
  styleUrls: ['./confirmed-orders.component.scss']
})
export class ConfirmedOrdersComponent implements OnInit {
  model: NgbDateStruct;
  flag:boolean=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  store:any={}
  catId:any='';
  partnerDetails={};
  cartProductData:any =[];
  ordersData: any;
  totalAmt:any;
  unitTotalCount:any;
  data:any={
    fromDt:new Date,
    toDt:new Date
  };
  closeResult = '';
  selectedObj:any = {};
  constructor(private router: Router, public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.data.fromDt = this.convetDateFormat(new Date);
    this.data.toDt = this.convetDateFormat(new Date);

    
    this.ordersData=[]
    this.getOrder();
    // this.getPartner();
  }

  convetDateFormat(dt) {
    console.log(dt);
  let year = dt.getFullYear();
  let month = (dt.getMonth()+1).toString().padStart(2, '0');
  let day = (dt.getDate()).toString().padStart(2, '0');
   return  year + '-' + month + '-' +day;
  
  }
  //////Get Data
  
  getOrder() {
    Axios.get(AppUrls._baseUrl + actionUrl._getOrdersByStatus,{
     params:{
       role:"Admin",
       status:"CONFIRMED",
       fromDt: this.data.fromDt,
       toDt: this.data.toDt
     }
    })
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success' ) {
          this.ordersData = response.data.data;
          console.log(this.ordersData);
          console.log(response.data);
          // this.dtTrigger.next();
        }
        
        else{
          this.ordersData = []; 
        }
        // else if(this.baseService.checkToken(response.data.message , response.data.status))
        // {
          
        // }
         })
      .catch(function (error) {
        console.log(error)
      })
  }

  


  changeOdersStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateOrderStatus,{
        id:data._id,
        isActive:!data.isActive
    })
      .then(response => { 
        if (response.data.isSuccess) {
          this.openSnackBar(response.data.message,'5000','close');
          //  this.getCategoriesNames();
          window.location.reload();
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
  // viewData(id)
  // {
  //   this.router.navigate(['/view-subcategories'],{queryParams: {catId : id}})
  // }

/////////////////Edit Data
editData(id)
{
  this.router.navigate(['/edit-categories'],{queryParams: {catId : id}})
}
  ////////////////Delete Categoire
  deleteOrder(id)
  {
    if(confirm("Do You Delete This Record Permanently"))
    {
    Axios.delete(AppUrls._baseUrl + actionUrl._deletePartner+id,{
    })
      .then(response => { 
        console.log("Deleted Testing..")
        console.log(response)
        if (response.data.isSuccess) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getOrder();
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      "lengthMenu": [[100, 200, -1], [100,200, "All"]]
    };
  
  if(!!localStorage.getItem('pendingOrder'))
  {
 this.data=JSON.parse(localStorage.getItem('pendingOrder'));
 this.getOrder();
  }
  else
  {
    this.getOrder();
  }
}

  dataSubmit()
  {
   localStorage.setItem('pendingOrder',JSON.stringify(this.data));
   window.location.reload();
  }

  
updateStatus(id)
{
  Swal.fire({
    // title: 'Are you sure?',
    text: 'Are you sure? Order is Delivered?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    var data={
      id : id,
      status : 'COMPLETED'
     }
    if (result.isConfirmed) {
      Axios.put(AppUrls._baseUrl + actionUrl._updateOrderStatus,data,{
      })
       .then(response => {        
         console.log(response)
         if (response.data.code == 200 && response.data.type == "success") {
           this.openSnackBar(response.data.message,'5000','close');
          //  this.dataSubmit();
          this.router.navigateByUrl("/completed-orders")
         }
         else{
           this.openSnackBar(response.data.message,'5000','close');
          }
       })
       .catch(function (error) {
         console.log(error)
       })
    }
  })
}
openXl(content,selObj) {
    console.log(selObj);
    console.log();
    this.selectedObj = selObj;
     this.cartProductData =  JSON.parse(selObj.productDetails);
     this.totalAmt = selObj.orderTotalAmount;
     this.unitTotalCount = selObj.totalUnits;
    // this.selectedObj.slot =  Date.parse(selObj.slot)
    this.modalService.open(content, { size: 'xl' ,ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("LLLLLLL",result);
      Axios.put(AppUrls._baseUrl + actionUrl._updateOrderById+result._id,result,{
       })
        .then(response => {        
          console.log(response)
          if (response.data. status) {
            this.openSnackBar(response.data.message,'5000','close');
            this.getOrder();
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
