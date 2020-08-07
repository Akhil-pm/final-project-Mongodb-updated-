import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={ email: '' ,password: ''};
  msg="";


  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  loginUser()
  {

   
      this.auth.loginUser(this.loginData)
      .subscribe(
        (res:any)=> {
          console.log(res)
          console.log(res.user.role)
          localStorage.setItem('token',res.token)
          this.router.navigate(['/'])
        },
        err=> {
          this.msg="ENTER VALID CREDENTIALS!!"
          // alert("****** ENTER VALID CREDENTIALS ******")
        }
      )
   
  }



}
