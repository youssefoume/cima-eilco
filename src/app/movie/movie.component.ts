import { Component, isDevMode } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie : any;
  display : boolean = false;
  idMovie : string = '';

  constructor(private apiService:ApiService){}
  
  ngOnInit(): void {
  }

  getMovie(id:string){
    this.apiService.getMovie(id).subscribe(m => {
      this.movie = m;
      this.display = true;
    });
  }
}
