import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FileMetaData } from '../models/file';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up-main.component.css', './sing-up-util.component.css']
})
export class SingUpComponent {
  email : string = '';
  password : string = '';
  repassword : string = '';
  username : string = '';
  inputNames : string[] = ['email', 'password', 'repassword'];
  isValide: any = { email : true , password: true, repassword : true, username : true};
  validateText: any = { email: '', password: '', username : '' };
  errorMessage: any;

  constructor(private fileService: FileService, private fireStorage: AngularFireStorage,private auth : AuthService,private router : Router) { }
  selectedFiles !: FileList;


  ngOnInit() {
    this.errorMessage = this.auth.errorMessage;
    
  }

  changeUpload(){
    if (this.email !== '' && this.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) != null){
      this.isUploaded = false;
    }
    else this.isUploaded = true;
  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
      this.router.navigate(['/home']);
    })
  }

  register() {
    this.errorMessage.register = null;
    const inputsElements : string[] = [this.email, this.password, this.repassword, this.username];

    this.isValide.email = true;
    for(let key of Object.keys(this.isValide)) this.isValide[key] = true;

    inputsElements.forEach((x,i) => {
      if(x.trim() === ''){
        this.isValide[this.inputNames[i]] = false;
        this.validateText[this.inputNames[i]] = `${this.inputNames[i].at(0)?.toUpperCase()}${this.inputNames[i].slice(1)} is required`; 
      }
    })
    
    if (this.email !== '' && this.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null){
      this.isValide.email = false;
      this.validateText.email = 'Email is not valid';
    }

    if(this.password !== '' && this.password.length < 8){
      this.isValide.password = false;
      this.validateText.password = '8 characaters at least';
    }

    if(this.password !== this.repassword){
      this.isValide.repassword = false;
      this.validateText.repassword = 'Doesn\'t match password'; 
    }

    if (!Object.values(this.isValide).includes(false)) {
      this.auth.register(this.email, this.password, this.username);
      console.log(this.auth.errorMessage.register);
      if(this.auth.errorMessage.register === ''){
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.username = '';
      }
    }
  }
 
  currentFileUpload !: FileMetaData;
  percentage: number | undefined ;
  isUploaded: boolean = true;
 


  uploadFile() {
    this.ngOnInit();
    this.currentFileUpload =  new FileMetaData(this.selectedFiles[0]);
    const path = 'images/'+this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
       storageRef.getDownloadURL().subscribe(downloadLink => {
         this.currentFileUpload.id = '';
         this.currentFileUpload.url = downloadLink;
         this.currentFileUpload.size = this.currentFileUpload.file.size;
         this.currentFileUpload.name = this.currentFileUpload.file.name;

         this.fileService.saveMetaDataOfFile(this.currentFileUpload,this.email);
       })
      
    })
    ).subscribe( (res : any) => {
       this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
       if(this.percentage === 100) this.isUploaded = true;
       console.log(this.percentage);
    }, err => {
       console.log('Error occured');
    });

 }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

}

