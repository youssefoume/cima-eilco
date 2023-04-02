import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { FileMetaData } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore, private fireStorage : AngularFireStorage) { }

  // save meta data of file to firestore
  saveMetaDataOfFile(fileObj : FileMetaData,email:string) {

    const fileMeta = {
      id : '',
      name : fileObj.name,
      url : fileObj.url,
      size : fileObj.size,
      email : email
    }

     fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('/images').add(fileMeta);
    
  }

}