import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookingServicesService } from 'src/app/Book-online/booking-services.service';
import { BookingStatusComponent } from '../booking-status/booking-status.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss']
})
export class BookTicketComponent implements OnInit {
  selectedSeats: number[] = [];
  rows = 10;
  seatsPerRow = 10;
  seats = this.generateSeats(this.rows, this.seatsPerRow);


  constructor(public dialogRef: MatDialogRef<BookTicketComponent>,
    public dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) private TicketsData:any, private service: BookingServicesService,private router:Router){}

   ngOnInit(): void {
    let seatsBooked = this.TicketsData.bookedSeats;
    this.seats.forEach((booking:any) => {
      for(let j=0; j< booking.length; j++){
        for(let i=0;i < seatsBooked.length ;i++){
          if(booking[j].number === seatsBooked[i]){
            booking[j].booked = true;
          }
        }
      }
    } );
    console.log(seatsBooked);
  }
  
  generateSeats(rows: number, seatsPerRow: number): any[] {
    const seats = [];
    for (let i = 1; i <= rows; i++) {
      const row = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        row.push({ number: (i-1)*seatsPerRow+j, booked: false, selected: false });
      }
      seats.push(row);
    }
    return seats;
  }

  selectSeat(seat: any) {
    if (!seat.booked) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeats.push(seat.number);
      } else {
        const index = this.selectedSeats.indexOf(seat.number);
        if (index > -1) {
          this.selectedSeats.splice(index, 1);
        }
      }
    }
  }

  submit() {
    console.log('Selected Seats:', this.selectedSeats);
    let responseBody:any = this.TicketsData.data;
    responseBody.booked_seats = JSON.stringify(this.selectedSeats);
    this.service.bookMovieSeats(responseBody).subscribe(data =>
      {
       if(data){
       const details =  this.dialog.open(BookingStatusComponent,{
          width: '400px',
          data: true
        });
        details.afterClosed().subscribe((result:any) => {
          this.service.loginData(result);
          this.router.navigate(['/Home/Movies']);
          this.dialogRef.close();
        })
       }
      },error =>{ 
        this.dialog.open(BookingStatusComponent,{
          width: '400px',
          data: false
        });
      });
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
