import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../models/favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favoriteResult: Favorite[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.getFavorites();
    this.getLengthFavorites();
  }

  getFavorites() {
    this.favoriteService.getAllFavorites().subscribe(result => {
      const u = localStorage.getItem('userMail');
      console.log(u);
      
      this.favoriteResult = result.filter(f => f.payload.doc.id.startsWith(u != null ? u : 'None')).map(f => {
          return {
            ...f.payload.doc.data() as {}
          } as Favorite;
      })
    });
  }

  getLengthFavorites() {
    return this.favoriteResult.length;
  }
}
