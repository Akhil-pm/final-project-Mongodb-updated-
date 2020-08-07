import { Component, OnInit } from '@angular/core';
import {ZonesService} from '../zones.service'
import { Router } from '@angular/router';
import {PlacesModel} from '../zones-list/places.model'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-zones',
  templateUrl: './edit-zones.component.html',
  styleUrls: ['./edit-zones.component.css']
})
export class EditZonesComponent implements OnInit {

  title: String="Edit ";

  editItem = new PlacesModel(null,null,null,null)

  constructor(private zonesService:ZonesService,private router:Router) { }

  ngOnInit(): void {
    this.editItem=this.zonesService.getEditItem()
  }

  update()                                           //Initiated on clicking update button
  {
    this.zonesService.updateItem(this.editItem)
    .subscribe(data=>{
      console.log(data)
      alert("success")
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
    })
   
    
            
    
  }

}
