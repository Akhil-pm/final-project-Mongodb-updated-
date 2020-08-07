import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title:String = "Tvm-Covid19" 

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

}
