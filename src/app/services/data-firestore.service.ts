
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class DataFirestoreService {

 

  constructor(private firestore: AngularFirestore){

    
    
  }


// Ajouter l'objet de données à la collection
add_profil(p : Profil) {
  p.id = this.firestore.createId();
  return this.firestore.collection('/profils').add(p);
}
getAllprofils() {

  
 return this.firestore.collection('/profils').valueChanges();

  
}
getImage() {

  
  return this.firestore.collection('/images').valueChanges();
 
   
 }

}
