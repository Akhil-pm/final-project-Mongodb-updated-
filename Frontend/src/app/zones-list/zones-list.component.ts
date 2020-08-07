import { Component, OnInit } from '@angular/core';
import {ZonesService} from '../zones.service'
import {PlacesModel} from './places.model'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.css']
})
export class ZonesListComponent implements OnInit {
  title:String = "list" 
  userRoleStatus:string;

  list: PlacesModel[];

  constructor(private zonesService:ZonesService,private router: Router,public auth:AuthService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems()
  {
    this.zonesService.getZoneslist()
     .subscribe((data)=>{
       this.list = JSON.parse(JSON.stringify(data))
     })
  }

  deleteItem(item)
 {
   this.zonesService.deleteZone(item._id)
   .subscribe(res => {
    this.loadItems();   
  })   
 }

 edit(item)                                          
 {
   console.log("edit called")
   this.zonesService.ToEdit(item);  
   this.router.navigate(['/edit'])
 }

}
