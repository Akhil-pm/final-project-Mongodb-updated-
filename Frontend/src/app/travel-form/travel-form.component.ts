import { Component, OnInit } from '@angular/core';
import {ZonesService} from '../zones.service'
import { Router } from '@angular/router';
import { reg_Form_Model } from './reg_form.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.css']
})
export class TravelFormComponent implements OnInit {
  msg="";

  constructor(private zonesService:ZonesService,private router: Router) { }

  public reg_form_data=new reg_Form_Model(null,null,null,null,null,null,null,null,null,null,null,null,null)

  ngOnInit(): void {
  }

  AddData()
  {
    // console.log(this.reg_form_data)
    this.zonesService.submit_form(this.reg_form_data)
    .subscribe((res:any)=>{
      if(res.flag==="false")
      {
        this.msg=res.msg;
        // alert(res.msg)
      }
      else{
        alert(res.msg)
        // this.msg=res.msg;
        this.router.navigate(['/'])
      }
      
    },
    err=>{console.log(err)}
    
    )
    
    
  }

}
