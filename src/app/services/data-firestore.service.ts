import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataFirestoreService {

  
  constructor(private firestore: AngularFirestore){

    
    
  }
  getData(){
    return this.firestore.doc<Data>('data/Yy7aO5t1SYkwblfdT0qA').valueChanges();
  }

}
