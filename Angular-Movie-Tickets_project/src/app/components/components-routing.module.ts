import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheatersComponent } from './theaters/theaters.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path:'',component:HomeComponent,
    children:[
        {path:'', redirectTo:'/Home/Movies', pathMatch:'full'},
        {path:'Movies', component: MoviesComponent},
        {path:'Theater', component:TheatersComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
