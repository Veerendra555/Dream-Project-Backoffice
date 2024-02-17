import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import Axios from 'axios';
import {Location} from '@angular/common';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Validators, FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { countries } from './country-data-store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {
  public countries:any = countries;
  registerForm: FormGroup;
  submitted = false;

  userData: any ={
    bussinessType :"Retailers"
  };
  country:any;
  address:any={};
  model: NgbDateStruct;
  id:any = null;
  closeResult: string;
  selectedObj: any={};
  dropdownList = [];
  formModel = {
    "selectedItems": []
  };
  dropdownSettings:IDropdownSettings;
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
  constructor( private formBuilder: FormBuilder,
    private router: Router,private arouter:ActivatedRoute,
    private authService : AuthServiceService,
    private _location: Location,
    public snackBar:MatSnackBar,config: NgbModalConfig, private modalService: NgbModal) { 
    this.id =  this.arouter.snapshot.queryParamMap.get('id');
    if(this.id != null)
    {
     this.getUserById();
    }
    let tmp =[]
    for(let i=0; i < this.countries.length; i++) {
      tmp.push({ id: this.countries[i].code3, itemName: this.countries[i].name });
    }
    this.dropdownList = tmp;
  }

  //////Get Data
  
  getUserById() {
    Axios.get(AppUrls._baseUrl + actionUrl._getUserById+this.id,{

      // headers: {
      //   'x-auth' : this.baseService.authToken
      // },
    })
      .then(response => { 
        if(response.data.code == 200 && response.data.type == 'success') {
          this.userData = response.data.data;
          this.address = response.data.data.address[0];
          console.log(this.userData);
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
  //   this.registerForm = this.formBuilder.group({
  //     firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,16}$")]],
  //     lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,16}$")]],
  //     phone: ['', [Validators.required, Validators.pattern("^((\\+91-?))?[0-9]{10}$")]],
  //     email: ['', [Validators.required, ]],
  //     address: this.formBuilder.group({
  //       landmark: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,16}$")]],
  //       zipCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,16}$")]],
  //       country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,16}$")]],
  //     }),
  //       city: ['', [Validators.required, ]],
  //     zipCode: ['', [Validators.required, Validators.pattern("^((\\+91-?))?[0-9]{6}$")]],
      
  // });
}

onItemSelect(item: any) {
  this.country = item.itemName;
  console.log(item);
  console.log();
}
onSelectAll(items: any) {
  console.log(items);
}

// convenience getter for easy access to form fields
// get f() { return this.registerForm.controls; }
onSubmit(form:NgForm) {


  this.userData.address = [];
  this.address.country = this.country;
  console.log(this.userData);
  this.userData.address.push(this.address);
  // this.categorie.imageURL=this.imageUrl+"categories/"+this.keyPath;
  if (this.id == null) {
  Axios.post(AppUrls._baseUrl + actionUrl._addUser,this.userData,{
    headers: {
      'x-auth' : this.authService.authToken
    },
  })
    .then(response => {        
      console.log(response)
      if (response.data.code == 201 && response.data.type == "success") 
      {
        this.openSnackBar(response.data.message,'5000','close');
        // this.router.navigate(['/view-categorie'])
        this.backClicked()
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
delete this.userData.isActive;
delete this.userData.__v;
Axios.put(
  AppUrls._baseUrl + actionUrl._updateUser,this.userData,
)
  .then(response => {
    console.log('resp: ', response);
    if (response.data.code == 200 && response.data.type == 'success' ) {
      this.openSnackBar(response.data.message,'5000','close');
      // this.categorie = {};
      // form.resetForm("");
      this.getUserById();
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

  

  
  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }

  backClicked() {
    this._location.back();
  }


}
