import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './components-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingStatusComponent } from './booking-status/booking-status.component';
import { MatIconModule } from '@angular/material/icon';






@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BookingStatusComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule
  ],
  entryComponents:[
    BookTicketComponent
  ]
})
export class ComponentsModule { }
