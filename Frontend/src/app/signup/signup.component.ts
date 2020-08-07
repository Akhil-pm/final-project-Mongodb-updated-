import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registeredUser={ name:'', username:'',phoneNo:'', email: '' ,password: ''};

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  registerUser()
  {
    this.auth.registerUser(this.registeredUser)
    .subscribe((res:any)=>{
       console.log(res.exists)
       if(res.exists=="true")
       {
         alert("Email already exists")
       }
       else{
        alert("Success")
        console.log(res.token)
        localStorage.setItem('token',res.token)
        this.router.navigate(['/'])
       }
    },
    err=>{console.log(err)}
    )
  }

}
