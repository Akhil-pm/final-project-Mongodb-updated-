import { Component, OnInit } from '@angular/core';
import {ZonesService} from '../zones.service'
import {reg_Form_view_Model} from './reg_form_view.model'

@Component({
  selector: 'app-submitted-list',
  templateUrl: './submitted-list.component.html',
  styleUrls: ['./submitted-list.component.css']
})
export class SubmittedListComponent implements OnInit {

  constructor(private zonesService:ZonesService) { }

  title:String = "list of Applicants" 


  list: reg_Form_view_Model[];

  ngOnInit(): void {
    this.zonesService.getReglist()
     .subscribe((data)=>{
       this.list = JSON.parse(JSON.stringify(data))
       console.log(this.list)
     })
  }
  Approve(i)
  {
    i.approved=!i.approved
    console.log(i)
    this.zonesService.approveUser(i)
    .subscribe(data=>{
      console.log(data)
    })

  }

}
