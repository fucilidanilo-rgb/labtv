
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';

// Dati di un acquisto restituiti da Spring Boot
export interface Acquisto {
  id: number;
  movieId: number;
  title: string;
  poster: string | null;
  purchaseDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly http = inject(HttpClient);

  private readonly acquistiUrl =
    `${environment.springBootUrl}/acquisti`;

  // =====================================
  // TMDB - CATALOGO FILM
  // =====================================

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(
        `${environment.tmdbBaseUrl}/discover/movie` +
        `?api_key=${environment.tmdbApiKey}`
      )
      .pipe(map((response) => response.results));
  }

  // =====================================
  // TMDB - RICERCA FILM
  // =====================================

  searchMovies(query: string): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(
        `${environment.tmdbBaseUrl}/search/movie` +
        `?api_key=${environment.tmdbApiKey}` +
        `&query=${encodeURIComponent(query)}`
      )
      .pipe(map((response) => response.results));
  }

  // =====================================
  // TMDB - DETTAGLI FILM
  // =====================================

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.tmdbBaseUrl}/movie/${id}` +
      `?api_key=${environment.tmdbApiKey}` +
      `&language=it-IT`
    );
  }

  // =====================================
  // TMDB - TRAILER E VIDEO
  // =====================================

  getMovieVideos(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.tmdbBaseUrl}/movie/${id}/videos` +
      `?api_key=${environment.tmdbApiKey}` +
      `&language=it-IT`
    );
  }

  // =====================================
  // TMDB - CAST
  // =====================================

  getMovieCredits(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.tmdbBaseUrl}/movie/${id}/credits` +
      `?api_key=${environment.tmdbApiKey}` +
      `&language=it-IT`
    );
  }

  // =====================================
  // SPRING BOOT - FILM ACQUISTATI
  // =====================================

  getPurchasedMovies(): Observable<Acquisto[]> {
    return this.http.get<Acquisto[]>(
      this.acquistiUrl
    );
  }

  // =====================================
  // SPRING BOOT - ACQUISTA FILM
  // =====================================

  buyMovie(movie: Movie): Observable<Acquisto> {

    const purchase = {
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster_path
    };

    return this.http.post<Acquisto>(
      this.acquistiUrl,
      purchase
    );
  }

  // =====================================
  // SPRING BOOT - RESTITUISCI FILM
  // =====================================

  returnMovie(purchaseId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.acquistiUrl}/${purchaseId}`
    );
  }

}
