import { Profil } from './../models/profil';
import { Component } from '@angular/core';
import { DataFirestoreService } from '../services/data-firestore.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userName:string | undefined;
  userEmail:string | undefined;
  photoUrl:string | undefined;
  createdAt:string | undefined;
  lastLoginAt:string | undefined;
  data_historic:any=[];
  constructor(private data:DataFirestoreService){
  
}
;
ngOnInit(){
  const user = localStorage.getItem('user')
 
  if(user!=null){

  this.userName=JSON.parse(user).displayName;
  this.photoUrl=JSON.parse(user).photoURL;

  this.userEmail=JSON.parse(user).email;
  this.getHistoric(JSON.parse(user).uid);
  this.getImageUrl(this.userEmail);
  


}
}


transformDate(dateInmilliseconds: number){
    // example timestamp for April 1, 2022
              const date = new Date(dateInmilliseconds );
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();

              const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

              return formattedDate;
  }
 getHistoric(id:string){
   this.data.getAllprofils().subscribe((data:any)=>{

    
    data.sort(this.comparerAge);
      
      data.forEach((element:any) => {
        if(element.id_user==id){
          element.date=this.transformDate(element.date);
          this.data_historic.push(element);
        }
      });
      this.data_historic=this.data_historic.slice(0,this.data_historic.length >10  ? 10 : this.data_historic.length);
   });
 

 }
 getImageUrl(email:string|undefined){
  return this.data.getImage().subscribe((data:any)=>{
    data.sort(this.comparerAge);
      
      data.forEach((element:any) => {
        if(element.email==email){
          if(this.photoUrl==undefined)
          this.photoUrl=element.url;
        }
      });
   });
 }
  comparerAge(a:any, b:any) {
  if (a.date < b.date) {
    return 1;
  } else if (a.date > b.date) {
    return -1;
  } else {
    return 0;
  }
}

 

}
