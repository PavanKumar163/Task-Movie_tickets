import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookingServicesService } from 'src/app/Book-online/booking-services.service';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss']
})
export class BookingStatusComponent implements OnInit {
  public status:boolean = false;
  constructor(public dialogRef: MatDialogRef<BookingStatusComponent>,
    public dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) private data:any, private service: BookingServicesService){}
   ngOnInit(): void {
     this.status= this.data;
   }
   onlyCloseDialog(){
    this.dialogRef.close();
   }
   closeDialog(){
    let email = {
      "user_mail_id": localStorage.getItem('email')
    };
    this.service.getTheaterDetails(email).subscribe((data:any) => {
      this.dialogRef.close(data);
    });
    
  }

}
