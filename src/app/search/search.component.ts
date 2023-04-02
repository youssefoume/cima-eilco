import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from '../services/api-movie.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private service: MovieApiServiceService, private title: Title, private router : ActivatedRoute) {
    this.title.setTitle('Search movies - Cima-EILCO');
  }

  searchResult: any[] = [];
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      this.searchResult = result.results;
      this.searchResult = this.searchResult.filter(item => item.poster_path !== null);
    });
  }

}
