// import { DataFirestoreService } from './../services/data-firestore.service';
// import { Data } from './../models/data';
// import { AuthService } from './../services/auth.service';
// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {


//   document: Observable<Data| null | undefined>;
//   constructor(private auth:AuthService,private dataFirestore:DataFirestoreService){

//     // Récupérez le document dans Firestore
//     this.document = this.dataFirestore.getData();
//   }


//  logout(){
//   this.auth.logout();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ApiService, private title: Title, private meta: Meta) {
    this.title.setTitle('Home - Cima-EILCO');
  }

  bannerResult: any = [];
  trendingMovieResult: any = [];
  trandingTVResult: any = [];
  comingSoonResult: any[] = [];
  inTheatersResult: any = [];

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.trandingTV();
    this.comingSoon();
    this.inTheaters();
  }


  // bannerdata
  bannerData() {
    this.service.getMovie('tt0111161').subscribe( result => this.bannerResult = result );
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe( result => this.trendingMovieResult = result.items.slice(20) );
  }
  
  trandingTV() {
    this.service.trendingTVApiData().subscribe( result => this.trandingTVResult = result.items.slice(20) );
  }

  comingSoon() {
    this.service.comingSoonData().subscribe( result => this.comingSoonResult = result.items );
  }

  inTheaters() {
    this.service.inTheatersData().subscribe(result => this.inTheatersResult = result.results );
  }
}
