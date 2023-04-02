import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Favorite } from '../models/favorite';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  existsFavorite: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  
  async isFavoriteExists(id: string) : Promise<boolean> {
    const favorite  = await this.firestore.collection<Favorite>('favorites', ref => ref.where('id', '==', id)).valueChanges().pipe(first()).toPromise();
    return favorite == null ? false : favorite.length > 0;
  }

  

  // Ajouter l'objet de données à la collection
  add_favorite(f: Favorite) {
    return this.firestore.collection('favoris').add(f);
  }

  remove_favorite(id : string) {
    return this.firestore.collection('favoris', ref => ref.where('id', '==', id))
      .get()
      .pipe(
        map((querySnapshot: QuerySnapshot<any>) => {
          const deletePromises: any[] = [];
          querySnapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
          });
          return Promise.all(deletePromises);
        })
      )
      .toPromise();
  }

  get_favorite(id : string) {
    return this.firestore.collection('favoris', ref => ref.where('id', '==', id)).snapshotChanges();
  }

  getAllFavorites() {
    return this.firestore.collection('favoris').snapshotChanges();
  }

}
