import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  ,Validators} from '@angular/forms';
// import { LoginModel } from '../../../Models/login.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Axios from 'axios';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  msg: string;

  constructor(private formBuilder: FormBuilder,
    private _http: HttpService,
    private authService:AuthServiceService,
    private  router: Router,
    public snackBar:MatSnackBar
    ) {
    this.createLoginForm();
  }
  submitted = false;
  // loginModelObj: LoginModel = new LoginModel();
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      // role:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  get f() {
    return this.loginForm.controls;
  }


  ngOnInit() {
   
  }

  adminLogin() {
    // this.router.navigate(['/dashboard']);
    localStorage.setItem('bulkiTradeToken', "loremdsmfkdsjnfdnskfjdskfskfdskfjksfdskjfdskjfhdskjfhkdsjfhkjdshfkjshkfjdnskfnazmvxn,dskfndsfkjdsnfkdsjnfkjdsnfkjdsnfkjdsnfkjdsnfkjdsnf");
    localStorage.setItem('userData', JSON.stringify({
      username:"veerendera",
      _id:"32984284jij4hu2342"
    }));
    this.authService.update();
    this.router.navigate(['/dashboard']);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
      // this.authService.signinUser(this.email.value, this.password.value);
          Axios.post(AppUrls._baseUrl + actionUrl._memberLoginUrl, {
            //  role:this.loginForm.get("role").value,
             email:this.loginForm.get("email").value,
             password:this.loginForm.get("password").value
        })    
          .then(response => {
            console.log(response);
            if (response.data.code == 200 && response.data.type == "success") 
            {
                console.log("success block")
                console.log(response.data.token)
                console.log(response.data.data)
              localStorage.setItem('bulkiTradeToken', response.data.token);
              localStorage.setItem('userData', JSON.stringify(response.data.data));
              this.authService.update();
             this.router.navigate(['/dashboard']);
             this.submitted=false;
            //  this.loginForm.reset();
            } 
            else
            {
              console.log("Error block")
              this.openSnackBar(response.data.message,'5000','close');
              // this.msg=response.data.message;
            }
          })
          .catch(function (error) {
            console.log(error)
          })
  
    }
  
    onReset() {
      this.submitted = false;
      this.loginForm.reset();
  }
  

  openSnackBar(msg, duration, action?) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }


}
