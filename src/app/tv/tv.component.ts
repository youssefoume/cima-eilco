import { Component } from '@angular/core';
import { MovieApiServiceService } from '../services/api-movie.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {
  searchResult: any = [];

  constructor(private service: MovieApiServiceService){}
  
  ngOnInit(): void {
    this.getTVs()
  }

  getTVs(){
    this.service.tvs().subscribe(e => this.searchResult = e.results)
  }
}