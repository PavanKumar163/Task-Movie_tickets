import { Component, OnInit } from '@angular/core';
import { BookingServicesService } from 'src/app/Book-online/booking-services.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  
  constructor(private auth: BookingServicesService) {}

  ngOnInit(): void {  
  }
  
  logout(): void {
    this.auth.logout();
  }
}
