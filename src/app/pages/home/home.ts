
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoviesService } from '../../services/movies';
import { AuthService } from '../../services/auth';
import { Movie } from '../../models/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);

  public authService = inject(AuthService);

  movies: Movie[] = [];
  purchasedMovies: any[] = [];

  searchText = '';

  imageBaseUrl = environment.imagesBaseUrl;

  loading = false;

  ngOnInit(): void {
    this.loadMovies();
    this.loadPurchasedMovies();
  }

  // CARICAMENTO FILM DA TMDB
  loadMovies(): void {

    this.loading = true;

    this.moviesService.getMovies().subscribe({

      next: (data) => {
        this.movies = data;
        this.loading = false;

        console.log('Film caricati:', data);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Errore caricamento film:', err);

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // RICERCA FILM
  onSearch(): void {

    const query = this.searchText.trim();

    if (!query) {
      this.loadMovies();
      return;
    }

    this.loading = true;

    this.moviesService.searchMovies(query).subscribe({

      next: (data) => {
        this.movies = data;
        this.loading = false;

        console.log('Risultati ricerca:', data);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Errore ricerca:', err);

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // FILM ACQUISTATI
  loadPurchasedMovies(): void {

    if (!this.authService.isLoggedIn()) {
      this.purchasedMovies = [];
      return;
    }

    this.moviesService.getPurchasedMovies().subscribe({

      next: (data) => {
        this.purchasedMovies = data;

        console.log('Film acquistati:', data);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Errore caricamento acquisti:', err);
      }
    });
  }

  // ACQUISTO SIMULATO
  compralo(movie: Movie): void {

    if (!this.authService.isLoggedIn()) {
      alert('Devi essere loggato per acquistare!');
      return;
    }

    this.moviesService.buyMovie(movie).subscribe({

      next: () => {
        alert('Film acquistato con successo!');
        this.loadPurchasedMovies();
      },

      error: (err) => {
        console.error('Errore acquisto:', err);
        alert("Errore durante l'acquisto");
      }
    });
  }

  // CONTROLLA SE UN FILM È ACQUISTATO
  isPurchased(movieId: number): boolean {

    return this.purchasedMovies.some(
      purchase => purchase.movieId === movieId
    );
  }

  // RECUPERA ID ACQUISTO
  getPurchaseId(movieId: number): number | null {

    const purchase = this.purchasedMovies.find(
      purchase => purchase.movieId === movieId
    );

    return purchase ? purchase.id : null;
  }

  // RESTITUZIONE FILM
  restituisciDaHome(movieId: number): void {

    const purchaseId = this.getPurchaseId(movieId);

    if (purchaseId === null) {
      return;
    }

    this.moviesService.returnMovie(purchaseId).subscribe({

      next: () => {
        alert('Film restituito');
        this.loadPurchasedMovies();
      },

      error: (err) => {
        console.error('Errore restituzione:', err);
        alert('Errore durante la restituzione');
      }
    });
  }
}
