
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
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
export class Home implements OnInit, OnDestroy {

  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);

  public authService = inject(AuthService);

  movies: Movie[] = [];
  purchasedMovies: any[] = [];

  searchText = '';
  imageBaseUrl = environment.imagesBaseUrl;
  loading = false;

  // NOTIFICA TOAST
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;

  private toastTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.loadMovies();
    this.loadPurchasedMovies();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    this.cdr.detectChanges();

    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 4000);
  }

  closeToast(): void {
    this.toastVisible = false;
    this.cdr.detectChanges();
  }

  // CARICAMENTO FILM
  loadMovies(): void {
    this.loading = true;

    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
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
      this.showToast(
        'Accedi per aggiungere un film alla libreria.',
        'info'
      );
      return;
    }

    this.moviesService.buyMovie(movie).subscribe({
      next: () => {
        this.showToast(
          'Film aggiunto alla tua libreria! Buona visione 🍿',
          'success'
        );
        this.loadPurchasedMovies();
      },
      error: (err) => {
        console.error('Errore acquisto:', err);
        this.showToast(
          "Impossibile completare l'acquisto. Riprova.",
          'error'
        );
      }
    });
  }

  // CONTROLLO ACQUISTI
  isPurchased(movieId: number): boolean {
    return this.purchasedMovies.some(
      purchase => purchase.movieId === movieId
    );
  }

  // ID ACQUISTO
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
        this.showToast(
          'Film restituito correttamente.',
          'success'
        );
        this.loadPurchasedMovies();
      },
      error: (err) => {
        console.error('Errore restituzione:', err);
        this.showToast(
          'Impossibile restituire il film. Riprova.',
          'error'
        );
      }
    });
  }
}
