import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";      //jwt-decode library is used to decode jwt token

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient,private router:Router) { }

  

  registerUser(user){
    return this.http.post("http://localhost:3000/signup",user)
   }

   loginUser(userlogin)
   {
     return this.http.post("http://localhost:3000/login",userlogin)
   }

   loggedIn()
   {
     return !!localStorage.getItem('token')
   }
   getToken()
   {
     return localStorage.getItem('token')
   }

   logout()
   {
     localStorage.removeItem('token')
     this.router.navigate(['/'])
   }

   isAdmin()
   {
    const token = localStorage.getItem('token')
    try{
      let decoded_token=jwt_decode(token)
      if( decoded_token.userType==="admin"){ return true}
      else{return false}
    }
    catch(err)
         {  }
   }
   isUser()
   {

      const token = localStorage.getItem('token')
      try{
       let  decoded_token=jwt_decode(token)
       if(decoded_token.userType==="user"){ return true}
       else{return false}
   }
   catch(err)
         {  }
        
      }
         

     


}
