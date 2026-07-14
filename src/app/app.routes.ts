import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Purchases } from './pages/purchases/purchases';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { authGuard } from './guards/auth-guard';
import { Contacts } from './pages/contacts/contacts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'movie/:id', component: MovieDetail },
  { path: 'purchases', component: Purchases, canActivate: [authGuard] },
  { path: 'contacts', component: Contacts },
  { path: '**', redirectTo: '' }
];