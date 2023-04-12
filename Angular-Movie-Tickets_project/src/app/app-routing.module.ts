import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheatersComponent } from './components/theaters/theaters.component';
import { MoviesComponent } from './components/movies/movies.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:' ', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path: 'Home',
  loadChildren: () =>
    import('./components/components.module').then((m) => m.ComponentsModule)},
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
