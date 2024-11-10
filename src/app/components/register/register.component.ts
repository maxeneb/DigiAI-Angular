import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  StudentArray : any[] = [];
 
  name: string ="";
  address: string ="";
  fee: Number =0;
  currentStudentID = "";

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router,
    private http: HttpClient) { this.getAllStudent()}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  saveRecords() {
    let bodyData = {
       "name": this.registerForm.controls['fullName'].value,
       "email": this.registerForm.controls['email'].value,
       "password": this.registerForm.controls['password'].value
    };
   
    let jsonString = JSON.stringify(bodyData);
   
    this.http.post("http://127.0.0.1:8000/users/", jsonString).subscribe((resultData: any) => {
       console.log(resultData);
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully!' });
       this.router.navigate(['login'])
    });
   }

  getAllStudent()
  {
    this.http.get("http://127.0.0.1:8000/users/")
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }

}
