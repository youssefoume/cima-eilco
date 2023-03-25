import { DataFirestoreService } from './../services/data-firestore.service';
import { Data } from './../models/data';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  document: Observable<Data| null | undefined>;
  constructor(private auth:AuthService,private dataFirestore:DataFirestoreService){

    // Récupérez le document dans Firestore
    this.document = this.dataFirestore.getData();
  }


 logout(){
  this.auth.logout();}
}
