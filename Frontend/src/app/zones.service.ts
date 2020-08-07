import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {PlacesModel} from './zones-list/places.model'

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private place:PlacesModel;

  constructor(private http:HttpClient) { }

  getZoneslist()
  {
    return this.http.get("http://localhost:3000/places")
  }
  newPlace(item)
  {
    return this.http.post("http://localhost:3000/add",{"data":item})
    
    
  }

  deleteZone(_id: String)
  { 
      return this.http.delete("http://localhost:3000/delete/"+_id)
  }


  ToEdit(item)                   //initiated on clicking edit button 
  {
    this.place=item;
  }

  getEditItem()                       //initiated on loading edit component 
  {
    return this.place
  }
  updateItem(item)
  {
    return this.http.put("http://localhost:3000/edit",{"data":item})
    
  }

  submit_form(item)                                             //initiated on submitting travel application form
  {
    return this.http.post("http://localhost:3000/register",item)
  }

  getReglist()
  {
    return this.http.get("http://localhost:3000/list")
  }
  approveUser(item)                                            //initiated on clicking approve button by admin
  {
    console.log("worked")
    return this.http.post("http://localhost:3000/approve",item)
  }


}
