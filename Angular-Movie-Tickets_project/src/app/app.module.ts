import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TheatersComponent } from './components/theaters/theaters.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    BookTicketComponent,
    MoviesComponent,
    TheatersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  entryComponents:[BookTicketComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
