import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  uploadForm!: FormGroup;
  imageUrl: any;
  items!: MenuItem[];
  resultMessage: string;
  showResults: boolean = false;

  logoSrc = 'assets/logo.png';
  logoAlt = 'Logo';
  logoWidth = 50;
  logoHeight = 50;

  constructor(private formBuilder: FormBuilder,
    private imageUploadService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) {  
    this.uploadForm = this.formBuilder.group({
    file: ['']
  }); }



  ngOnInit(): void {
    this.items = [
      {
        label: '',
        escape: false,
      },
      // {
      //   label: 'Home',
      //   //routerLink: ['/home']
      // },
      // {
      //   label: 'About',
      //   //routerLink: ['/about']
      // },
      // {
      //   label: 'Login',
      //   //icon: 'pi pi-user',
      //   routerLink: ['/login'],
      //   class: 'login'
      // }
    ];
  }

  file!: File;

  onFileSelect(event) {
    if (event.files.length > 0) {
      this.file = event.files[0];
  
      console.log(this.file); 
  
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
  
      reader.readAsDataURL(this.file);
    }
  }
  

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file);
  
    formData.forEach((value, key) => {
      console.log(key + ' ' + value)
    });
  
    this.http.post('http://localhost:8000/upload/', formData)
      .subscribe(res => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Model loaded!', detail:''});
        
        let result = res['result'];
        if (result === "AI_ART") {
          result == "AI ART"
        } else
        result === "NON AI ART";

        const confidence = res['confidence'];

        this.displayPredictionResult(result, confidence);
        this.showResults = true;
      })
  }

  displayPredictionResult(result: string, confidence: number) {
    this.resultMessage = `This art is ${result} with ${confidence}% confidence.`;
  }
}
