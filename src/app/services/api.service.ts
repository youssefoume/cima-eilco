import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseurl: string = 'https://imdb-api.com/en/API/';
  public code : string = '/k_b9ktyc12'; //k_ik4lgz9k - k_hub6y69m - k_7oenly01 - k_7oenly01 - k_9hv4budf

  public baseurl2 = "https://api.themoviedb.org/3";
  public apikey = "08cc33bd5ae3a747598ce2ad84376e66";

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

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');
    return this.http.get(`${this.baseurl2}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseurl2}/movie/${data}?api_key=${this.apikey}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseurl2}/movie/${data}/videos?api_key=${this.apikey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseurl2}/movie/${data}/credits?api_key=${this.apikey}`)
  }
  // action 
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseurl2}/discover/movie?api_key=${this.apikey}&with_genres=53`);
  }
}
