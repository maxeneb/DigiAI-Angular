import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {}

  loginUser() {
    const {email, password} = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.some(user => user.password === password)) {
          this.router.navigate(['landing']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email or Password is incorrect.' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )    
  }
}
