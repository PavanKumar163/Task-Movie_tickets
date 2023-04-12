import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { faLock } from '@fortawesome/free-solid-svg-icons';
import { BookingServicesService } from '../Book-online/booking-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // faLock = faLock;
  loginForm = this.fb.group({
    user_mail_id: ['',[Validators.email]]
  });

  constructor(private auth:BookingServicesService, private router:Router, private fb:FormBuilder){}
  ngOnInit(): void {
    let stringData:any | null;
    let storedData:any | null;
    stringData = localStorage.getItem('movies');
    if(stringData){
      storedData = JSON.parse(stringData);
      this.auth.loginData(storedData);
    }
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/Home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.getTheaterDetails(this.loginForm.value).subscribe(
        (result: any) => {
          console.log(result);
          localStorage.setItem('movies',JSON.stringify(result));
          this.auth.loginData(result);
          this.router.navigate(['/Home']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }
}
