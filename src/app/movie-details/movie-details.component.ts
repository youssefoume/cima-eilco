import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../services/api-movie.service';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../models/favorite';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  getMovieDetailResult: any;
  getMovieCastResult: any[] = [];
  isFavorite: boolean = true;
  favoriteResult: Favorite[] = [];



  constructor(private service: MovieApiServiceService, private router: ActivatedRoute, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getMovieCast(getParamId);
    console.log(this.isFavorite);
  }

  getIsFavorite(){
    console.log(this.favoriteResult);
    this.isFavorite = this.favoriteResult.some(f => f.id === this.getMovieDetailResult.id);
  }


  addToFavorites() {
    let f: Favorite = { id: this.getMovieDetailResult.id, image: this.getMovieDetailResult.poster_path, type: 'movie' };
    if (!this.isFavorite) {
      this.favoriteService.add_favorite(f);
      this.isFavorite = true;
    }
    console.log(this.favoriteResult);
  }

  deleteFavorite() {
    if (this.isFavorite) {
      this.favoriteService.remove_favorite(this.getMovieDetailResult.id.toString());
      this.isFavorite = false;
    }
  }

  getFavorite(id: string) {
    console.log(this.favoriteService.get_favorite(id));
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      this.getMovieDetailResult = await result;
    });
  }

  getMovieCompanies() {
    return this.getMovieDetailResult.production_companies.map((x: { id: number, logo_path: string, name: string, origin_country: string }) => x.name).join(',');
  }

  getMovieCountries() {
    return this.getMovieDetailResult.production_countries.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getMovieGenres() {
    return this.getMovieDetailResult.genres.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getMovieSpokenLanguages() {
    return this.getMovieDetailResult.spoken_languages.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe(async (result) => {
      this.getMovieCastResult = await result.cast;
      this.getMovieCastResult = this.getMovieCastResult.filter(c => c.profile_path !== null);
    });
  }


}
