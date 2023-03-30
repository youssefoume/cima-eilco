import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseurl: string = 'https://imdb-api.com/en/API/';
  public code : string = '/k_ik4lgz9k'; //k_ik4lgz9k - k_hub6y69m

  constructor(private http: HttpClient) { }

  getMovie(idMovie: string): Observable<any> {
    return this.http.get<any>(this.baseurl+'title'+idMovie);
  }

  bannerApiData(): Observable<any> {
    return this.http.get<any>(this.baseurl+'Top250Movies'+this.code);
  }

  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}MostPopularMovies${this.code}`);
  }

  trendingTVApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}MostPopularTVs${this.code}`);
  }

  comingSoonData(): Observable<any>{
    return this.http.get(`${this.baseurl}ComingSoon${this.code}`)
  }

  inTheatersData(): Observable<any>{
    return this.http.get(`${this.baseurl}InTheaters${this.code}`)
  }
}
