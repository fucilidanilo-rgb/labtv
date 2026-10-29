
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { Purchases } from './pages/purchases/purchases';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { Contacts } from './pages/contacts/contacts';
import { Project } from './pages/project/project';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // HOME
  {
    path: '',
    component: Home
  },

  // LOGIN
  {
    path: 'login',
    component: LoginComponent
  },

  // REGISTRAZIONE DISABILITATA NELLA DEMO
  {
    path: 'register',
    redirectTo: '',
    pathMatch: 'full'
  },

  // DETTAGLIO FILM
  {
    path: 'movie/:id',
    component: MovieDetail
  },

  // ACQUISTI - ACCESSO PROTETTO
  {
    path: 'purchases',
    component: Purchases,
    canActivate: [authGuard]
  },

  // PAGINA CONTATTI
  {
    path: 'contacts',
    component: Contacts
  },

  // PAGINA PORTFOLIO
  {
    path: 'project',
    component: Project
  },

  // ROTTE NON ESISTENTI
  {
    path: '**',
    redirectTo: ''
  }

];
