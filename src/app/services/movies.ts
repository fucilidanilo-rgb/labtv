import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<any>(`${environment.tmdbBaseUrl}/discover/movie?api_key=${environment.tmdbApiKey}`)
      .pipe(map((res) => res.results));
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.http
      .get<any>(
        `${environment.tmdbBaseUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${encodeURIComponent(query)}`
      )
      .pipe(map((res) => res.results));
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.tmdbBaseUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }


  getMovieVideos(id: number): Observable<any> {
  return this.http.get<any>(
    `${environment.tmdbBaseUrl}/movie/${id}/videos?api_key=${environment.tmdbApiKey}`
  );
}

  getPurchasedMovies(): Observable<any[]> {
    const user = this.authService.getUser();

    if (!user || !user.id) {
      return this.http.get<any[]>(`${environment.localUrl}/films-acquistati?userId=0`);
    }

    return this.http.get<any[]>(
      `${environment.localUrl}/films-acquistati?userId=${user.id}`
    );
  }

  buyMovie(movie: any): Observable<any> {
    const user = this.authService.getUser();

    const purchase = {
      userId: user.id,
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      purchaseDate: new Date().toISOString()
    };

    return this.http.post(`${environment.localUrl}/films-acquistati`, purchase);
  }

  returnMovie(purchaseId: number): Observable<any> {
    return this.http.delete(`${environment.localUrl}/films-acquistati/${purchaseId}`);
  }

  
}