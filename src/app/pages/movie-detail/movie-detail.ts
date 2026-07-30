import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from '../../services/movies';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private sanitizer = inject(DomSanitizer);

  // Dati del film
  movie = signal<any | null>(null);
  loading = signal(false);

  // URL immagini TMDB
  imageBaseUrl = environment.imageBaseUrl;

  // Trailer
  trailerKey = '';
  trailerUrl: SafeResourceUrl | null = null;
  showTrailer = false;

  // Cast
  cast: any[] = [];
  showCast = false;
  loadingCast = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id || isNaN(id)) {
      console.error('ID film non valido');
      return;
    }

    this.loadMovie(id);
    this.loadTrailer(id);
    this.loadCast(id);
  }

  loadMovie(id: number): void {
    this.loading.set(true);

    this.moviesService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Errore dettaglio film:', err);
        this.loading.set(false);
      }
    });
  }

  loadTrailer(id: number): void {
    this.moviesService.getMovieVideos(id).subscribe({
      next: (res) => {
        const video =
          res.results.find(
            (v: any) =>
              v.site === 'YouTube' &&
              v.type === 'Trailer'
          ) ||
          res.results.find(
            (v: any) =>
              v.site === 'YouTube' &&
              v.type === 'Teaser'
          ) ||
          res.results.find(
            (v: any) =>
              v.site === 'YouTube'
          );

        if (video) {
          this.trailerKey = video.key;
          console.log('Trailer pronto:', video);
        } else {
          console.log('Trailer non disponibile per questo film');
        }
      },
      error: (err) => {
        console.error('Errore caricamento trailer:', err);
      }
    });
  }

  loadCast(id: number): void {
    this.loadingCast = true;

    this.moviesService.getMovieCredits(id).subscribe({
      next: (res) => {
        this.cast = (res.cast || []).slice(0, 8);
        this.loadingCast = false;

        console.log('Cast principale:', this.cast);
      },
      error: (err) => {
        console.error('Errore caricamento cast:', err);

        this.cast = [];
        this.loadingCast = false;
      }
    });
  }

  toggleCast(): void {
    this.showCast = !this.showCast;
  }

  setTrailerUrl(muted: boolean): void {
    const muteValue = muted ? 1 : 0;

    const url =
      `https://www.youtube.com/embed/${this.trailerKey}` +
      `?autoplay=1` +
      `&mute=${muteValue}` +
      `&controls=1` +
      `&rel=0` +
      `&modestbranding=1`;

    this.trailerUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  apriTrailer(): void {
    if (!this.trailerKey) {
      alert('Trailer non disponibile');
      return;
    }

    this.setTrailerUrl(true);
    this.showTrailer = true;
  }

  chiudiTrailer(): void {
    this.showTrailer = false;
    this.trailerUrl = null;
  }
}