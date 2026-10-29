
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.css'
})
export class Purchases implements OnInit, OnDestroy {

  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);

  // FILM ACQUISTATI
  purchases: any[] = [];
  loading = false;
  returningId: number | null = null;

  // NOTIFICHE TOAST
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;

  private toastTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.loadPurchases();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  // MOSTRA NOTIFICA
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

  // CHIUDE NOTIFICA
  closeToast(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = undefined;
    }

    this.toastVisible = false;
    this.cdr.detectChanges();
  }

  // CARICA FILM ACQUISTATI
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
        this.cdr.detectChanges();

        this.showToast(
          'Impossibile caricare i tuoi film. Riprova.',
          'error'
        );
      }
    });
  }

  // RESTITUISCI FILM
  restituisci(purchaseId: number): void {
    if (this.returningId !== null) {
      return;
    }

    this.returningId = purchaseId;
    this.cdr.detectChanges();

    this.moviesService.returnMovie(purchaseId).subscribe({
      next: () => {
        this.returningId = null;

        this.showToast(
          'Film restituito con successo! 🎬',
          'success'
        );

        this.loadPurchases();
      },

      error: (err) => {
        console.error('Errore durante la restituzione:', err);

        this.returningId = null;
        this.cdr.detectChanges();

        this.showToast(
          'Impossibile restituire il film. Riprova.',
          'error'
        );
      }
    });
  }
}
