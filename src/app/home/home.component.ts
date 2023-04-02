// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../services/api.service';
// import { Title, Meta } from '@angular/platform-browser';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   constructor(private service: ApiService, private title: Title, private meta: Meta) {
//     this.title.setTitle('Home - Cima-EILCO');
//   }

//   bannerResult: any = [];
//   trendingMovieResult: any = [];
//   trandingTVResult: any = [];
//   comingSoonResult: any[] = [];
//   boxOfficeResult: any = [];

//   ngOnInit(): void {
//     this.bannerData();
//     this.trendingData();
//     this.trandingTV();
//     this.comingSoon();
//   }


//   // bannerdata
//   bannerData() {
//     this.service.trendingMovieApiData().subscribe( result => {
//       this.bannerResult = result.items.slice(5,10) 
//       let poster_path = [
//         'https://www.bu.edu/files/2023/03/boston-strangler-poster-social.jpg',
//         'https://movies.universalpictures.com/media/01-cb-dm-mobile-banner-1080x745-pl-f01-112222-638e6de200084-1.jpg',
//         'https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/12/dungeons-dragons-honor-among-thieves-poster-1.jpg',
//         'https://media1.houstonpress.com/hou/imager/u/magnum/15246957/hou-art-20230310-ltfs-header.jpeg?cb=1678379969',
//         'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/john-wick-4-total-film-social-featured.jpg',
//       ];
//       for(let i = 0; i < this.bannerResult.length; i++) {
//         this.bannerResult[i].poster_path = poster_path[i];
//       }
//     });
//   }

//   trendingData() {
//     this.service.trendingMovieApiData().subscribe( result => this.trendingMovieResult = result.items.slice(20) );
//   }
  
//   trandingTV() {
//     this.service.trendingTVApiData().subscribe( result => this.trandingTVResult = result.items.slice(20) );
//   }

//   comingSoon() {
//     this.service.comingSoonData().subscribe( result => this.comingSoonResult = result.items.slice(20) );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../services/api-movie.service';
import { Title,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService,private title:Title,private meta:Meta) {
    this.title.setTitle('Cima-EILCO');
   }

  bannerResult: any = [];
  trendingTVSerieResult: any = [];
  upcomingMovieResult: any[] = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
    this.trendingTVSerie();
  }
  

  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }

  trendingTVSerie(){
    this.service.TrendingTVSeries().subscribe((result) => {
      this.trendingTVSerieResult = result.results;
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovieResult = result.results;
    });
  }

  // action 
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure 
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }


  // animation 
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }


  // comedy 
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary 
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }


  // science-fiction 
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

}
