import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseurl : string = 'https://imdb-api.com/en/API/Title/k_7oenly01/';
  constructor(private http : HttpClient) { }
  getMovie(idMovie:string) : Observable<any>{
    return this.http.get<any>(this.baseurl+idMovie);
  }
}
