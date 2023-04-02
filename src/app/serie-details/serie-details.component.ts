import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../services/api-movie.service';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../models/favorite';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.css']
})
export class SerieDetailsComponent implements OnInit {

  getSerieDetailResult: any;
  getSerieCastResult: any[] = [];
  isFavorite: boolean = true;
  favoriteResult: Favorite[] = [];



  constructor(private service: MovieApiServiceService, private router: ActivatedRoute, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getSerie(getParamId);
    this.getSerieCast(getParamId);
  }

  getIsFavorite(){
    console.log(this.favoriteResult);
    this.isFavorite = this.favoriteResult.some(f => f.id === this.getSerieDetailResult.id);
  }


  addToFavorites() {
    let f: Favorite = { id: this.getSerieDetailResult.id, image: this.getSerieDetailResult.poster_path, type: 'Serie' };
    if (!this.isFavorite) {
      this.favoriteService.add_favorite(f);
      this.isFavorite = true;
    }
    console.log(this.favoriteResult);
  }

  deleteFavorite() {
    if (this.isFavorite) {
      this.favoriteService.remove_favorite(this.getSerieDetailResult.id.toString());
      this.isFavorite = false;
    }
  }

  getFavorite(id: string) {
    console.log(this.favoriteService.get_favorite(id));
  }

  getSerie(id: any) {
    this.service.getSerieDetails(id).subscribe(async (result) => {
      this.getSerieDetailResult = await result;
    });
  }

  getSerieCompanies() {
    return this.getSerieDetailResult.production_companies.map((x: { id: number, logo_path: string, name: string, origin_country: string }) => x.name).join(',');
  }

  getSerieCountries() {
    return this.getSerieDetailResult.production_countries.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getSerieGenres() {
    return this.getSerieDetailResult.genres.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getSerieSpokenLanguages() {
    return this.getSerieDetailResult.spoken_languages.map((x: { id: number, name: string }) => x.name).join(',');
  }

  getSerieCast(id: any) {
    this.service.getSerieCast(id).subscribe(async (result) => {
      this.getSerieCastResult = result.cast;
      this.getSerieCastResult = this.getSerieCastResult.filter(c => c.profile_path !== null);
    });
  }


}
