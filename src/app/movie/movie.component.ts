import { Component, isDevMode } from '@angular/core';
import { OnInit } from '@angular/core';
import { MovieApiServiceService } from '../services/api-movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  searchResult: any = [];

  constructor(private service: MovieApiServiceService){}
  
  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(){
    this.service.movies().subscribe(e => this.searchResult = e.results)
  }
}


