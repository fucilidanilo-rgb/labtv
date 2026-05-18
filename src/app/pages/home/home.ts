import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  imageBaseUrl = environment.imageBaseUrl;
  loading = false;

  ngOnInit(): void {
    this.loadMovies();
    this.loadPurchasedMovies();
  }

  loadMovies(): void {
    this.loading = true;

    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Film caricati:', data);
      },
      error: (err) => {
        console.error('Errore caricamento film:', err);
        this.loading = false;
      }
    });
  }

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
        console.log('Risultati ricerca:', data);
      },
      error: (err) => {
        console.error('Errore ricerca:', err);
        this.loading = false;
      }
    });
  }

  loadPurchasedMovies(): void {
    if (!this.authService.isLoggedIn()) return;

    this.moviesService.getPurchasedMovies().subscribe({
      next: (data) => {
        this.purchasedMovies = data;
        this.cdr.detectChanges();
        console.log('Film acquistati:', data);
      },
      error: (err) => {
        console.error('Errore caricamento acquisti:', err);
      }
    });
  }

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
        alert('Errore durante l’acquisto');
      }
    });
  }

  isPurchased(movieId: number): boolean {
    return this.purchasedMovies.some((p) => p.movieId === movieId);
  }

  getPurchaseId(movieId: number): number | null {
    const purchase = this.purchasedMovies.find((p) => p.movieId === movieId);
    return purchase ? purchase.id : null;
  }

  restituisciDaHome(movieId: number): void {
    const purchaseId = this.getPurchaseId(movieId);

    if (!purchaseId) return;

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