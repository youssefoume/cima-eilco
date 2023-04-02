import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Favorite } from '../models/favorite';
import { first } from 'rxjs/operators';
import { user } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  isFavorite: boolean = false;
  e: any=[];

  constructor(private firestore: AngularFirestore) { }

  add_favorite(f: Favorite) {
    const id = localStorage.getItem('userMail')+'-'+f.idF;
    return this.firestore.collection('favorite').doc(id).set(f);
  }

  remove_favorite(idF : number) {
    const id = localStorage.getItem('userMail')+'-'+idF;
    return this.firestore.collection('favorite').doc(id).delete();
  }

  getIsFavorite(idF : number) {
    const id = localStorage.getItem('userMail')+'-'+idF;
    return this.firestore.collection<Favorite>('favorite').doc(id).valueChanges();
  }

  getAllFavorites() {
    return this.firestore.collection('favorite').snapshotChanges();
  }

}
