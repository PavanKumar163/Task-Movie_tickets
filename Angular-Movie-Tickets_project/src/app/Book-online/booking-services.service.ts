import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingServicesService {
private theaterUrl:string = "https://zincubate.in/api/MovieTicketChecker?action=";
private loggedInData = new BehaviorSubject<any>(null);
loggedInDetails = this.loggedInData.asObservable();
private theaterData = new BehaviorSubject<any>(null);
movieTheaterDetails = this.theaterData.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

   getTheaterDetails(emailId: any):Observable<any>{
    localStorage.setItem('login','true');
    localStorage.setItem('email',emailId.user_mail_id);
    return this.http.post<any>(this.theaterUrl + 'getAllDetails',emailId);
   }
   bookMovieSeats(request:any){
    return this.http.post<any>(this.theaterUrl + 'bookSeats',request).pipe(catchError(err => {return err}));
   }

   getMovieDetails(data:any){
    this.theaterData.next(data);
   }

   logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  }

   getToken(): string | null {
    return localStorage.getItem('login');
  }

  isLoggedIn() {
    return (this.getToken() !== 'null' && this.getToken() !== null);
  }

   login(data:{}):Observable<any>{
      return this.getTheaterDetails(data);
   }

   loginData(data:any){
    this.loggedInData.next(data);
   }

}
