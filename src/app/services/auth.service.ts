import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  predictImage(file: File) {
    throw new Error('Method not implemented.');
  }
  
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User){
    return this.http.post(`${this.baseUrl}/users/`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }
   
  loginUser(email: string, password: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.baseUrl}/users/`, { email, password });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user.id}/`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}/`);
  }
  
  uploadImage(file: File) {
      const formData = new FormData();
      formData.append('file', file);
  
      // return this.http.post<any>(`${this.baseUrl}/landing/`, formData);
      let newImage = fetch(this.baseUrl, {
        method: 'POST',
        body: formData
      }).then(response => response.json()).catch(error => console.error)
    }
}
 

