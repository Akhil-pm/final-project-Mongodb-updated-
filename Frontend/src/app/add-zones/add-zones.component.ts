import { Component, OnInit } from '@angular/core';
import {ZonesService} from '../zones.service'
import { PlacesModel } from '../zones-list/places.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-zones',
  templateUrl: './add-zones.component.html',
  styleUrls: ['./add-zones.component.css']
})
export class AddZonesComponent implements OnInit {
  title: String="Add new containment zone";

  constructor(private zonesService:ZonesService,private router: Router) { }

  public newData=new PlacesModel(null,null,null,null)

  ngOnInit(): void {
  }

  AddPlace()
  {
    console.log(this.newData)
    this.zonesService.newPlace(this.newData)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/'])
    },
      err=>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status===401)
          {
            this.router.navigate(['/login'])
          }
        }
      }
      )
    
     
    
  }

}
