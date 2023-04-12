import { Component, OnInit } from '@angular/core';
import { BookingServicesService } from '../../Book-online/booking-services.service';
import { Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookTicketComponent } from '../book-ticket/book-ticket.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss']
})
export class TheatersComponent implements OnInit {
  movieData: any | null;
  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 30)); 
  BookingDate:any | null;

  constructor(private service:BookingServicesService, private location:Location, private dialog: MatDialog){}

  ngOnInit(): void {
    this.service.movieTheaterDetails.subscribe(data => {
      if(data){
        this.movieData = data;
      }else {
        localStorage.removeItem('login');
        this.service.logout();
      }
    })
  }
  openSeats(show:string,theater:string,movie:string,bookings:any): void {
    let seatsBooked:any = [];
   for(let i =0 ; i<bookings.length; i++){
    if(show === bookings[i].show1_time && this.BookingDate === bookings[i].date){
      seatsBooked = this.stringToArray(bookings[i].show1_booked_seats);
    }
    if(show === bookings[i].show2_time && this.BookingDate === bookings[i].date){
      seatsBooked = this.stringToArray(bookings[i].show2_booked_seats);
    }
    if(show === bookings[i].show3_time && this.BookingDate === bookings[i].date){
      seatsBooked = this.stringToArray(bookings[i].show3_booked_seats);
    }
    if(show === bookings[i].show4_time && this.BookingDate === bookings[i].date){
      seatsBooked = this.stringToArray(bookings[i].show4_booked_seats);
    }
   }
    let email = localStorage.getItem('email');
    console.log(show,theater,movie);
    let ticketsData:any = {
      "show_time":show,
      "movie_name":movie,
      "theatre_name":theater,
      "date":this.BookingDate,
      "user_mail_id":email
    };
    let finalData:any = { "data": ticketsData, "bookedSeats" : seatsBooked};
    this.dialog.open(BookTicketComponent,{
      width: '80%',
      height: '75%',
      data: finalData
    });
  }

  stringToArray(data:string){
    const str = data;
    const strWithoutBrackets = str.replace(/[\[\]\s]+/g, ',');
    const arr = strWithoutBrackets.split(',');
    const numArr = arr.map(str => Number(str));
    return numArr;
  }

  convertTime(time:string){
    const timeParts = time.split(' ');
    const hours = timeParts[0];
    const minutes = timeParts[2];
    return `${hours}hrs ${minutes}min`;
  }
  goBack(){
    this.location.back();
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.BookingDate = null;
    let selectedDate = event.value;
    if(selectedDate){
      const day = String(selectedDate?.getDate()).padStart(2, '0'); // pad day with leading zero if necessary
      const month = selectedDate ? String(selectedDate?.getMonth() + 1).padStart(2, '0'): undefined; // pad month with leading zero if necessary
      const year = selectedDate?.getFullYear();
      this.BookingDate = `${day}/${month}/${year}`;
      console.log('Selected date:', this.BookingDate);
    }
  }

}
