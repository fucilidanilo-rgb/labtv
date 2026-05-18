import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.css'
})
export class Purchases implements OnInit {
  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);

  purchases: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.loading = true;

    this.moviesService.getPurchasedMovies().subscribe({
      next: (data) => {
        this.purchases = data;
        this.loading = false;
        console.log('Acquisti caricati:', data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore nel caricamento acquisti:', err);
        this.loading = false;
        alert('Errore nel caricamento acquisti');
      }
    });
  }

  restituisci(purchaseId: number): void {
    this.moviesService.returnMovie(purchaseId).subscribe({
      next: () => {
        alert('Film restituito con successo');
        this.loadPurchases();
      },
      error: (err) => {
        console.error('Errore durante la restituzione:', err);
        alert('Errore durante la restituzione');
      }
    });
  }
}