import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import Axios from 'axios';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  userData: any;
  date;
  flag:boolean = true;
  constructor(private router: Router,private arouter:ActivatedRoute,public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.getUsers();
     this.date = new Date().toLocaleDateString("en-US");

  }

  //////Get Data
  
  getUsers() {
    Axios.get(AppUrls._baseUrl + actionUrl._getAllUser,{
      params:{
        role:"Admin"
      }
     })
      .then(response => { 
        if(response.data.code == 200 && response.data.type == 'success') {
          this.userData = response.data.data;
          console.log(this.userData);
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

  changeUserStatus(data)
  {
    Axios.put(AppUrls._baseUrl + actionUrl._updateUserStatus,{
        id:data._id,
        isActive:!data.isActive
    })
      .then(response => { 
        if (response.data.isSuccess) {
          this.openSnackBar(response.data.message,'5000','close');
           this.getUsers();
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


   /////////////////Edit Data
editData(id)
{
  this.router.navigate(['/user'],{queryParams: {id : id}})
}

  ///////////////////View Sub Categoires

  viewData(id)
  {
    this.router.navigate(['/view-user'],{queryParams: {userId : id}})
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      "lengthMenu": [[100, 200, -1], [100,200, "All"]]
    };
  }



  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }


}
