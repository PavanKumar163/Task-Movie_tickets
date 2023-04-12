import { Component, OnInit } from '@angular/core';
import { BookingServicesService } from '../../Book-online/booking-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movies:any=[];
  theaters:any=[];
  constructor(private service:BookingServicesService, private router: Router){}
  ngOnInit(): void {
    this.service.loggedInDetails.subscribe(data => {
      if(data !== null){
        this.movies = data.movies;
        this.theaters = data.theatre;
      }else {
        localStorage.removeItem('login');
        this.service.logout();
      }
    })
  }
  convertMinuteToHour(minute:number){
    var hours = Math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

  navigateToMovie(data:any){
    console.log(data);
    let availbleTheaters:any = {
      "release_date": data.release_date,
      "length": data.running_time,
      "language": data.language,
      "movie": data.movie_name,
      "poster": data.thumbnail_url,
      "rating": data.imdb_rating,
      "tags": data.tags,
      "theaters" : []
    };
    this.theaters.forEach((theater:any) => {
       if(theater.show1_movie === availbleTheaters.movie || theater.show2_movie === availbleTheaters.movie || theater.show3_movie === availbleTheaters.movie || theater.show4_movie === availbleTheaters.movie){
        availbleTheaters.theaters.push({
            "movie" : availbleTheaters.movie,
            "address" : theater.address,
            "customer_rating": theater.customer_rating,
            "theatre_name": theater.theatre_name ,
            "thumbnail_url": theater.thumbnail_url,
            "website": theater.website,
            "shows" :[],
            "booked_times": theater.booked_seats ? theater.booked_seats : []
        });
        for(let i=0;i < availbleTheaters.theaters.length ; i++){
          if(theater.theatre_name === availbleTheaters.theaters[i].theatre_name){
            if(theater.show1_movie === availbleTheaters.movie){
              availbleTheaters.theaters[i].shows.push(theater.show1_time);
              // if(theater.booked_seats){
              //   availbleTheaters.theaters[i].booked_times.push(this.seatsCompare(theater.show1_time,theater.booked_seats));
              // }
            }
            if(theater.show2_movie === availbleTheaters.movie){
              availbleTheaters.theaters[i].shows.push(theater.show2_time);
              // if(theater.booked_seats){
              // availbleTheaters.theaters[i].booked_times.push(this.seatsCompare(theater.show2_time,theater.booked_seats));
              // }
            }
            if(theater.show3_movie === availbleTheaters.movie){
              availbleTheaters.theaters[i].shows.push(theater.show3_time);
              // if(theater.booked_seats){
              // availbleTheaters.theaters[i].booked_times.push(this.seatsCompare(theater.show3_time,theater.booked_seats));
              // }
            }
            if(theater.show4_movie === availbleTheaters.movie){
              availbleTheaters.theaters[i].shows.push(theater.show4_time);
              // if(theater.booked_seats){
              // availbleTheaters.theaters[i].booked_times.push(this.seatsCompare(theater.show4_time,theater.booked_seats));
              // }
            }

          }
        }
       }
    });
    if(availbleTheaters){
      this.service.getMovieDetails(availbleTheaters);
      this.router.navigate(['/Home/Theater']);
    }
  }

  //bookedtickets validation
//   seatsCompare(time:any,bookedSeats:any){
//     let seats = bookedSeats;
//     let finalList:any = [];
//     if(bookedSeats.length > 0){
//     seats.forEach((seat:any) => {
//        if(seat.show1_time === time) {
//           finalList.push({"date":seat.date , "bookedSeats": seat.show1_booked_seats, "time":seat.show1_time});
//        }
//        if(seat.show2_time === time) {
//         finalList.push({"date":seat.date , "bookedSeats": seat.show2_booked_seats, "time":seat.show2_time});
//      }
//      if(seat.show3_time === time) {
//       finalList.push({"date":seat.date , "bookedSeats": seat.show3_booked_seats, "time":seat.show3_time});
//    }
//    if(seat.show4_time === time) {
//     finalList.push({"date":seat.date , "bookedSeats": seat.show4_booked_seats, "time":seat.show4_time});
//  }
//     });
//   }
//   return finalList;

//   }

}
