import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../services/api-movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  constructor(private service: MovieApiServiceService, private router: ActivatedRoute) { }
  getMovieDetailResult: any;
  getMovieCastResult: any[] = [];
  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getMovieCast(getParamId);
  }


  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      this.getMovieDetailResult = await result;
      console.log(this.getMovieDetailResult);
    });
  }

  getMovieCompanies(){
    return this.getMovieDetailResult.production_companies.map((x:{id:number, logo_path: string ,name: string, origin_country: string}) => x.name).join(',');
  }

  getMovieCountries(){
    return this.getMovieDetailResult.production_countries.map((x:{id:number, name: string}) => x.name).join(',');
  }

  getMovieGenres(){
    return this.getMovieDetailResult.genres.map((x:{id:number, name: string}) => x.name).join(',');
  }

  getMovieSpokenLanguages(){
    return this.getMovieDetailResult.spoken_languages.map((x:{id:number, name: string}) => x.name).join(',');
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe(async (result) => {
      this.getMovieCastResult = await result.cast;
      this.getMovieCastResult = this.getMovieCastResult.filter(c => c.profile_path !== null);
    });
  }


}
